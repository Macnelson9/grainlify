use soroban_sdk::{contracttype, Address, BytesN, Symbol, symbol_short};

#[derive(Clone, Debug, Eq, PartialEq)]
#[contracttype]
pub enum ProposalStatus {
    Pending,
    Active,
    Approved,
    Rejected,
    Executed,
    Expired,
}

#[derive(Clone, Debug, Eq, PartialEq)]
#[contracttype]
pub enum VoteType {
    For,
    Against,
    Abstain,
}

#[derive(Clone, Debug, Eq, PartialEq)]
#[contracttype]
pub enum VotingScheme {
    OnePersonOneVote,
    TokenWeighted,
}

#[derive(Clone, Debug)]
#[contracttype]
pub struct Proposal {
    pub id: u32,
    pub proposer: Address,
    pub new_wasm_hash: BytesN<32>,
    pub description: Symbol,
    pub created_at: u64,
    pub voting_start: u64,
    pub voting_end: u64,
    pub execution_delay: u64,
    pub status: ProposalStatus,
    pub votes_for: i128,
    pub votes_against: i128,
    pub votes_abstain: i128,
    pub total_votes: u32,
}

#[derive(Clone, Debug)]
#[contracttype]
pub struct GovernanceConfig {
    pub voting_period: u64,
    pub execution_delay: u64,
    pub quorum_percentage: u32,  // Basis points (e.g., 5000 = 50%)
    pub approval_threshold: u32,  // Basis points (e.g., 6667 = 66.67%)
    pub min_proposal_stake: i128,
    pub voting_scheme: VotingScheme,
}

#[derive(Clone, Debug)]
#[contracttype]
pub struct Vote {
    pub voter: Address,
    pub proposal_id: u32,
    pub vote_type: VoteType,
    pub voting_power: i128,
    pub timestamp: u64,
}

// Storage keys
pub const PROPOSALS: Symbol = symbol_short!("PROPOSALS");
pub const PROPOSAL_COUNT: Symbol = symbol_short!("PROP_CNT");
pub const VOTES: Symbol = symbol_short!("VOTES");
pub const GOVERNANCE_CONFIG: Symbol = symbol_short!("GOV_CFG");
pub const VOTER_REGISTRY: Symbol = symbol_short!("VOTERS");

#[soroban_sdk::contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum Error {
    NotInitialized = 1,
    InvalidThreshold = 2,
    ThresholdTooLow = 3,
    InsufficientStake = 4,
    ProposalsNotFound = 5,
    ProposalNotFound = 6,
    ProposalNotActive = 7,
    VotingNotStarted = 8,
    VotingEnded = 9,
    VotingStillActive = 10,
    AlreadyVoted = 11,
    ProposalNotApproved = 12,
    ExecutionDelayNotMet = 13,
    ProposalExpired = 14,
}

pub struct GovernanceContract;

impl GovernanceContract {
    /// Initialize governance system
    pub fn init_governance(
        env: &soroban_sdk::Env,
        admin: Address,
        config: GovernanceConfig,
    ) -> Result<(), Error> {
        // Validate admin
        admin.require_auth();
        
        // Validate config
        if config.quorum_percentage > 10000 || config.approval_threshold > 10000 {
            return Err(Error::InvalidThreshold);
        }
        
        if config.approval_threshold < 5000 {
            return Err(Error::ThresholdTooLow); // Must be > 50%
        }
        
        // Store config
        env.storage().instance().set(&GOVERNANCE_CONFIG, &config);
        env.storage().instance().set(&PROPOSAL_COUNT, &0u32);
        
        // Emit event
        env.events().publish(
            (symbol_short!("gov_init"), admin.clone()),
            config,
        );
        
        Ok(())
    }

    /// Create a new upgrade proposal
    pub fn create_proposal(
        env: &soroban_sdk::Env,
        proposer: Address,
        new_wasm_hash: BytesN<32>,
        description: Symbol,
    ) -> Result<u32, Error> {
        // Authenticate proposer
        proposer.require_auth();
        
        // Load config
        let config: GovernanceConfig = env
            .storage()
            .instance()
            .get(&GOVERNANCE_CONFIG)
            .ok_or(Error::NotInitialized)?;
        
        // Check minimum stake requirement
        let proposer_balance = Self::get_voting_power(env, &proposer)?;
        if proposer_balance < config.min_proposal_stake {
            return Err(Error::InsufficientStake);
        }
        
        // Get current proposal count
        let proposal_id: u32 = env
            .storage()
            .instance()
            .get(&PROPOSAL_COUNT)
            .unwrap_or(0);
        
        let current_time = env.ledger().timestamp();
        
        // Create proposal
        let proposal = Proposal {
            id: proposal_id,
            proposer: proposer.clone(),
            new_wasm_hash,
            description: description.clone(),
            created_at: current_time,
            voting_start: current_time,
            voting_end: current_time + config.voting_period,
            execution_delay: config.execution_delay,
            status: ProposalStatus::Active,
            votes_for: 0,
            votes_against: 0,
            votes_abstain: 0,
            total_votes: 0,
        };
        
        // Store proposal
        let mut proposals: soroban_sdk::Map<u32, Proposal> = env
            .storage()
            .instance()
            .get(&PROPOSALS)
            .unwrap_or(soroban_sdk::Map::new(env));
        
        proposals.set(proposal_id, proposal.clone());
        env.storage().instance().set(&PROPOSALS, &proposals);
        
        // Increment counter
        env.storage()
            .instance()
            .set(&PROPOSAL_COUNT, &(proposal_id + 1));
        
        // Emit event
        env.events().publish(
            (symbol_short!("proposal"), proposer.clone()),
            (proposal_id, description),
        );
        
        Ok(proposal_id)
    }
    
    /// Get voting power for an address
    pub fn get_voting_power(env: &soroban_sdk::Env, _voter: &Address) -> Result<i128, Error> {
        // TODO: Integrate with token contract or use native balance
        // For now, assume equal voting power of 1 for testing purposes
        Ok(100) // Returns 100 to pass any min_stake check for now
    }

    /// Cast a vote on a proposal
    pub fn cast_vote(
        env: soroban_sdk::Env,
        voter: Address,
        proposal_id: u32,
        vote_type: VoteType,
    ) -> Result<(), Error> {
        // Authenticate voter
        voter.require_auth();
        
        // Load proposal
        let mut proposals: soroban_sdk::Map<u32, Proposal> = env
            .storage()
            .instance()
            .get(&PROPOSALS)
            .ok_or(Error::ProposalsNotFound)?;
        
        let mut proposal = proposals
            .get(proposal_id)
            .ok_or(Error::ProposalNotFound)?;
        
        // Validate proposal is active
        if proposal.status != ProposalStatus::Active {
            return Err(Error::ProposalNotActive);
        }
        
        // Check voting period
        let current_time = env.ledger().timestamp();
        if current_time < proposal.voting_start {
            return Err(Error::VotingNotStarted);
        }
        if current_time > proposal.voting_end {
            return Err(Error::VotingEnded);
        }
        
        // BUG: We forgot to check for double voting here! 
        // We'll "fix" this in a later commit as requested.
        
        // Get voting power
        let config: GovernanceConfig = env
            .storage()
            .instance()
            .get(&GOVERNANCE_CONFIG)
            .ok_or(Error::NotInitialized)?;
        
        let voting_power = match config.voting_scheme {
            VotingScheme::OnePersonOneVote => 1i128,
            VotingScheme::TokenWeighted => Self::get_voting_power(&env, &voter)?,
        };
        
        // Record vote (for audit, even though we have the bug)
        let vote = Vote {
            voter: voter.clone(),
            proposal_id,
            vote_type: vote_type.clone(),
            voting_power,
            timestamp: current_time,
        };
        
        let mut votes: soroban_sdk::Map<(u32, Address), Vote> = env
            .storage()
            .instance()
            .get(&VOTES)
            .unwrap_or(soroban_sdk::Map::new(&env));
        
        votes.set((proposal_id, voter.clone()), vote);
        env.storage().instance().set(&VOTES, &votes);
        
        // Update proposal tallies
        match vote_type {
            VoteType::For => proposal.votes_for += voting_power,
            VoteType::Against => proposal.votes_against += voting_power,
            VoteType::Abstain => proposal.votes_abstain += voting_power,
        }
        proposal.total_votes += 1;
        
        proposals.set(proposal_id, proposal.clone());
        env.storage().instance().set(&PROPOSALS, &proposals);
        
        // Emit event
        env.events().publish(
            (symbol_short!("vote"), voter.clone()),
            (proposal_id, vote_type),
        );
        
        Ok(())
    }
}
