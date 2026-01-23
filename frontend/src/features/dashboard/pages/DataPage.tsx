import React, { useState, useEffect } from 'react';
import { ChevronDown, Info } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart } from 'recharts';
import { useTheme } from '../../../shared/contexts/ThemeContext';

export function DataPage() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');
  const [projectInterval, setProjectInterval] = useState('Monthly interval');
  const [contributorInterval, setContributorInterval] = useState('Monthly interval');
  const [showProjectIntervalDropdown, setShowProjectIntervalDropdown] = useState(false);
  const [showContributorIntervalDropdown, setShowContributorIntervalDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const [projectFilters, setProjectFilters] = useState({
    new: false,
    reactivated: false,
    active: false,
    churned: false,
    prMerged: false,
  });
  const [contributorFilters, setContributorFilters] = useState({
    new: false,
    reactivated: false,
    active: false,
    churned: false,
    prMerged: false,
  });

  // Sample data for project activity (monthly data)
  const projectActivityData = [
    { month: 'January', value: 45, trend: 40, new: 12, reactivated: 5, active: 28, churned: -8, rewarded: 15420 },
    { month: 'February', value: 38, trend: 42, new: 8, reactivated: 4, active: 26, churned: -6, rewarded: 12300 },
    { month: 'March', value: 52, trend: 45, new: 15, reactivated: 7, active: 30, churned: -5, rewarded: 18650 },
    { month: 'April', value: 48, trend: 50, new: 11, reactivated: 6, active: 31, churned: -7, rewarded: 16800 },
    { month: 'May', value: 58, trend: 52, new: 18, reactivated: 8, active: 32, churned: -4, rewarded: 22100 },
    { month: 'June', value: 55, trend: 55, new: 14, reactivated: 6, active: 35, churned: -9, rewarded: 20500 },
    { month: 'July', value: 42, trend: 54, new: 9, reactivated: 5, active: 28, churned: -10, rewarded: 14200 },
    { month: 'August', value: 48, trend: 50, new: 12, reactivated: 7, active: 29, churned: -6, rewarded: 17300 },
    { month: 'September', value: 62, trend: 52, new: 20, reactivated: 9, active: 33, churned: -5, rewarded: 24800 },
    { month: 'October', value: 58, trend: 58, new: 16, reactivated: 8, active: 34, churned: -7, rewarded: 21900 },
    { month: 'November', value: 45, trend: 56, new: 10, reactivated: 6, active: 29, churned: -8, rewarded: 15600 },
    { month: 'December', value: 52, trend: 52, new: 13, reactivated: 7, active: 32, churned: -10, rewarded: 18900 },
  ];

  // Sample data for contributor activity
  const contributorActivityData = [
    { month: 'January', value: 42, trend: 38, new: 10, reactivated: 4, active: 28, churned: -6, rewarded: 14200 },
    { month: 'February', value: 35, trend: 40, new: 7, reactivated: 3, active: 25, churned: -5, rewarded: 11800 },
    { month: 'March', value: 48, trend: 42, new: 13, reactivated: 6, active: 29, churned: -4, rewarded: 16900 },
    { month: 'April', value: 45, trend: 46, new: 11, reactivated: 5, active: 29, churned: -6, rewarded: 15300 },
    { month: 'May', value: 38, trend: 44, new: 8, reactivated: 4, active: 26, churned: -7, rewarded: 12700 },
    { month: 'June', value: 52, trend: 45, new: 15, reactivated: 7, active: 30, churned: -5, rewarded: 19100 },
    { month: 'July', value: 48, trend: 48, new: 12, reactivated: 6, active: 30, churned: -8, rewarded: 17400 },
    { month: 'August', value: 55, trend: 50, new: 17, reactivated: 8, active: 30, churned: -4, rewarded: 21300 },
    { month: 'September', value: 50, trend: 52, new: 14, reactivated: 7, active: 29, churned: -6, rewarded: 18600 },
    { month: 'October', value: 58, trend: 54, new: 19, reactivated: 9, active: 30, churned: -5, rewarded: 23800 },
    { month: 'November', value: 52, trend: 56, new: 15, reactivated: 7, active: 30, churned: -7, rewarded: 19500 },
    { month: 'December', value: 48, trend: 52, new: 12, reactivated: 6, active: 30, churned: -8, rewarded: 17200 },
  ];

  // Contributors by country/region
  const contributorsByRegion = [
    { name: 'United Kingdom', value: 625, percentage: 45 },
    { name: 'Germany', value: 720, percentage: 52 },
    { name: 'Canada', value: 580, percentage: 42 },
    { name: 'India', value: 560, percentage: 40 },
    { name: 'Brazil', value: 490, percentage: 35 },
    { name: 'Netherlands', value: 300, percentage: 22 },
    { name: 'Australia', value: 430, percentage: 31 },
    { name: 'Spain', value: 280, percentage: 20 },
    { name: 'Italy', value: 220, percentage: 16 },
    { name: 'Poland', value: 280, percentage: 20 },
    { name: 'Sweden', value: 210, percentage: 15 },
    { name: 'Japan', value: 240, percentage: 17 },
    { name: 'China', value: 220, percentage: 16 },
  ];

  const toggleProjectFilter = (filter: keyof typeof projectFilters) => {
    setProjectFilters(prev => ({ ...prev, [filter]: !prev[filter] }));
  };

  const toggleContributorFilter = (filter: keyof typeof contributorFilters) => {
    setContributorFilters(prev => ({ ...prev, [filter]: !prev[filter] }));
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="backdrop-blur-[30px] bg-[#1a1410]/95 border-2 border-white/20 rounded-[12px] px-5 py-4 min-w-[200px]">
          <p className="text-[13px] font-bold text-white mb-3">{data.month} 2025</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#c9983a]" />
                <span className="text-[12px] text-white/80">New</span>
              </div>
              <span className="text-[13px] font-bold text-[#c9983a]">{data.new}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#d4af37]" />
                <span className="text-[12px] text-white/80">Reactivated</span>
              </div>
              <span className="text-[13px] font-bold text-[#d4af37]">{data.reactivated}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#c9983a]/70" />
                <span className="text-[12px] text-white/80">Active</span>
              </div>
              <span className="text-[13px] font-bold text-[#c9983a]/90">{data.active}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff6b6b]" />
                <span className="text-[12px] text-white/80">Churned</span>
              </div>
              <span className="text-[13px] font-bold text-[#ff6b6b]">{data.churned}</span>
            </div>
            <div className="h-px bg-white/10 my-2" />
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#c9983a] to-[#d4af37]" />
                <span className="text-[12px] text-white/80">Rewarded</span>
              </div>
              <span className="text-[13px] font-bold text-white">{data.rewarded.toLocaleString()} USD</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4 md:space-y-6 px-4 md:px-0">
      {/* Header Tabs */}
      <div className={`backdrop-blur-[40px] rounded-[16px] md:rounded-[24px] border p-1.5 md:p-2 transition-colors ${
        theme === 'dark'
          ? 'bg-white/[0.12] border-white/20'
          : 'bg-white/[0.12] border-white/20'
      }`}>
        <div className="flex items-center gap-1.5 md:gap-2 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-[12px] md:rounded-[16px] font-bold text-[12px] md:text-[14px] transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
              activeTab === 'overview'
                ? `bg-gradient-to-br from-[#c9983a]/30 to-[#d4af37]/20 border-2 border-[#c9983a]/50 ${
                    theme === 'dark' ? 'text-[#f5c563]' : 'text-[#2d2820]'
                  }`
                : `${theme === 'dark' ? 'text-[#d4d4d4]' : 'text-[#7a6b5a]'} hover:bg-white/[0.08]`
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-[12px] md:rounded-[16px] font-bold text-[12px] md:text-[14px] transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
              activeTab === 'projects'
                ? `bg-gradient-to-br from-[#c9983a]/30 to-[#d4af37]/20 border-2 border-[#c9983a]/50 ${
                    theme === 'dark' ? 'text-[#f5c563]' : 'text-[#2d2820]'
                  }`
                : `${theme === 'dark' ? 'text-[#d4d4d4]' : 'text-[#7a6b5a]'} hover:bg-white/[0.08]`
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab('contributions')}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-[12px] md:rounded-[16px] font-bold text-[12px] md:text-[14px] transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
              activeTab === 'contributions'
                ? `bg-gradient-to-br from-[#c9983a]/30 to-[#d4af37]/20 border-2 border-[#c9983a]/50 ${
                    theme === 'dark' ? 'text-[#f5c563]' : 'text-[#2d2820]'
                  }`
                : `${theme === 'dark' ? 'text-[#d4d4d4]' : 'text-[#7a6b5a]'} hover:bg-white/[0.08]`
            }`}
          >
            Contributions
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Left Column - Project Activity */}
        <div className="backdrop-blur-[40px] bg-white/[0.12] rounded-[16px] md:rounded-[24px] border border-white/20 p-4 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-0 mb-4 md:mb-6">
            <h2 className={`text-[16px] md:text-[18px] font-bold transition-colors ${
              theme === 'dark' ? 'text-[#f5f5f5]' : 'text-[#2d2820]'
            }`}>Project activity</h2>
            <div className="relative">
              <button
                onClick={() => setShowProjectIntervalDropdown(!showProjectIntervalDropdown)}
                className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-[8px] md:rounded-[10px] backdrop-blur-[20px] bg-white/[0.15] border border-white/25 hover:bg-white/[0.2] transition-all w-full sm:w-auto touch-manipulation"
              >
                <span className={`text-[12px] md:text-[13px] font-semibold transition-colors ${
                  theme === 'dark' ? 'text-[#f5f5f5]' : 'text-[#2d2820]'
                }`}>{projectInterval}</span>
                <ChevronDown className={`w-4 h-4 transition-colors flex-shrink-0 ${
                  theme === 'dark' ? 'text-[#d4d4d4]' : 'text-[#7a6b5a]'
                }`} />
              </button>
              {showProjectIntervalDropdown && (
                <div className="absolute right-0 sm:right-0 left-0 sm:left-auto mt-2 w-full sm:w-[180px] backdrop-blur-[30px] bg-white/[0.55] border-2 border-white/30 rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.15)] overflow-hidden z-50">
                  <button
                    onClick={() => {
                      setProjectInterval('Daily interval');
                      setShowProjectIntervalDropdown(false);
                    }}
                    className="w-full px-4 py-3 text-left text-[13px] font-medium text-[#2d2820] hover:bg-white/[0.3] transition-all touch-manipulation"
                  >
                    Daily interval
                  </button>
                  <button
                    onClick={() => {
                      setProjectInterval('Weekly interval');
                      setShowProjectIntervalDropdown(false);
                    }}
                    className="w-full px-4 py-3 text-left text-[13px] font-medium text-[#2d2820] hover:bg-white/[0.3] transition-all touch-manipulation"
                  >
                    Weekly interval
                  </button>
                  <button
                    onClick={() => {
                      setProjectInterval('Monthly interval');
                      setShowProjectIntervalDropdown(false);
                    }}
                    className={`w-full px-4 py-3 text-left text-[13px] font-medium transition-all touch-manipulation ${
                      projectInterval === 'Monthly interval'
                        ? 'bg-white/[0.35] text-[#2d2820] font-bold'
                        : 'text-[#2d2820] hover:bg-white/[0.3]'
                    }`}
                  >
                    Monthly interval
                  </button>
                  <button
                    onClick={() => {
                      setProjectInterval('Quarterly interval');
                      setShowProjectIntervalDropdown(false);
                    }}
                    className="w-full px-4 py-3 text-left text-[13px] font-medium text-[#2d2820] hover:bg-white/[0.3] transition-all touch-manipulation"
                  >
                    Quarterly interval
                  </button>
                  <button
                    onClick={() => {
                      setProjectInterval('Yearly interval');
                      setShowProjectIntervalDropdown(false);
                    }}
                    className="w-full px-4 py-3 text-left text-[13px] font-medium text-[#2d2820] hover:bg-white/[0.3] transition-all touch-manipulation"
                  >
                    Yearly interval
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Chart */}
          <div className="h-[240px] md:h-[280px] mb-4 md:mb-6 overflow-x-auto">
            <div className="min-w-[600px] md:min-w-0 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={projectActivityData}>
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#c9983a" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#d4af37" stopOpacity={0.4} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(122, 107, 90, 0.1)" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#7a6b5a" 
                    tick={{ fill: '#7a6b5a', fontSize: isMobile ? 9 : 11, fontWeight: 600 }}
                    angle={-45}
                    textAnchor="end"
                    height={isMobile ? 60 : 80}
                  />
                  <YAxis stroke="#7a6b5a" tick={{ fill: '#7a6b5a', fontSize: isMobile ? 9 : 11, fontWeight: 600 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="value" 
                    fill="url(#barGradient)" 
                    radius={[8, 8, 0, 0]}
                    maxBarSize={isMobile ? 30 : 40}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="trend" 
                    stroke="#2d2820" 
                    strokeWidth={isMobile ? 2 : 3}
                    dot={false}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => toggleProjectFilter('new')}
              className={`px-3 md:px-4 py-2 rounded-[8px] md:rounded-[10px] text-[12px] md:text-[13px] font-semibold transition-all touch-manipulation ${
                projectFilters.new
                  ? 'bg-[#c9983a] text-white shadow-[0_3px_12px_rgba(201,152,58,0.3)]'
                  : 'backdrop-blur-[20px] bg-white/[0.15] border border-white/25 text-[#2d2820] hover:bg-white/[0.2]'
              }`}
            >
              New
            </button>
            <button
              onClick={() => toggleProjectFilter('reactivated')}
              className={`px-3 md:px-4 py-2 rounded-[8px] md:rounded-[10px] text-[12px] md:text-[13px] font-semibold transition-all touch-manipulation ${
                projectFilters.reactivated
                  ? 'bg-[#c9983a] text-white shadow-[0_3px_12px_rgba(201,152,58,0.3)]'
                  : 'backdrop-blur-[20px] bg-white/[0.15] border border-white/25 text-[#2d2820] hover:bg-white/[0.2]'
              }`}
            >
              Reactivated
            </button>
            <button
              onClick={() => toggleProjectFilter('active')}
              className={`px-3 md:px-4 py-2 rounded-[8px] md:rounded-[10px] text-[12px] md:text-[13px] font-semibold transition-all touch-manipulation ${
                projectFilters.active
                  ? 'bg-[#c9983a] text-white shadow-[0_3px_12px_rgba(201,152,58,0.3)]'
                  : 'backdrop-blur-[20px] bg-white/[0.15] border border-white/25 text-[#2d2820] hover:bg-white/[0.2]'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => toggleProjectFilter('churned')}
              className={`px-3 md:px-4 py-2 rounded-[8px] md:rounded-[10px] text-[12px] md:text-[13px] font-semibold transition-all touch-manipulation ${
                projectFilters.churned
                  ? 'bg-[#c9983a] text-white shadow-[0_3px_12px_rgba(201,152,58,0.3)]'
                  : 'backdrop-blur-[20px] bg-white/[0.15] border border-white/25 text-[#2d2820] hover:bg-white/[0.2]'
              }`}
            >
              Churned
            </button>
            <button
              onClick={() => toggleProjectFilter('prMerged')}
              className={`px-3 md:px-4 py-2 rounded-[8px] md:rounded-[10px] text-[12px] md:text-[13px] font-semibold transition-all touch-manipulation ${
                projectFilters.prMerged
                  ? 'bg-[#c9983a] text-white shadow-[0_3px_12px_rgba(201,152,58,0.3)]'
                  : 'backdrop-blur-[20px] bg-white/[0.15] border border-white/25 text-[#2d2820] hover:bg-white/[0.2]'
              }`}
            >
              PR merged
            </button>
          </div>
        </div>

        {/* Right Column - Contributors Map */}
        <div className="backdrop-blur-[40px] bg-white/[0.12] rounded-[16px] md:rounded-[24px] border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-4 md:p-8">
          <h2 className={`text-[16px] md:text-[18px] font-bold mb-4 md:mb-6 transition-colors ${
            theme === 'dark' ? 'text-[#f5f5f5]' : 'text-[#2d2820]'
          }`}>Contributors map</h2>

          {/* World Map Visualization */}
          <div className="relative h-[200px] md:h-[280px] mb-4 md:mb-6 rounded-[12px] md:rounded-[16px] backdrop-blur-[20px] bg-gradient-to-br from-[#2d2820]/80 via-[#1a1410]/70 to-[#2d2820]/80 border border-white/10 overflow-hidden touch-pan-x touch-pan-y">
            {/* Map Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(201,152,58,0.2)" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* World Map SVG */}
            <svg 
              viewBox="0 0 800 400" 
              className="absolute inset-0 w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c9983a" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#d4af37" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#c9983a" stopOpacity="0.2" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* North America */}
              <path
                d="M 120 80 L 150 70 L 180 75 L 200 85 L 210 100 L 220 120 L 215 140 L 200 155 L 180 165 L 160 170 L 140 165 L 125 150 L 115 130 L 110 110 L 115 90 Z"
                fill="url(#mapGradient)"
                stroke="#c9983a"
                strokeWidth="1"
                opacity="0.7"
                filter="url(#glow)"
              />

              {/* South America */}
              <path
                d="M 180 200 L 195 190 L 210 195 L 215 210 L 220 230 L 215 250 L 210 270 L 200 285 L 185 295 L 175 290 L 170 270 L 165 250 L 168 230 L 175 210 Z"
                fill="url(#mapGradient)"
                stroke="#c9983a"
                strokeWidth="1"
                opacity="0.7"
                filter="url(#glow)"
              />

              {/* Europe */}
              <path
                d="M 380 75 L 410 70 L 430 75 L 445 85 L 450 100 L 445 115 L 430 125 L 410 130 L 390 125 L 375 110 L 372 95 L 375 80 Z"
                fill="url(#mapGradient)"
                stroke="#c9983a"
                strokeWidth="1"
                opacity="0.8"
                filter="url(#glow)"
              />

              {/* Africa */}
              <path
                d="M 380 140 L 405 135 L 425 140 L 440 155 L 450 175 L 455 200 L 450 225 L 440 245 L 425 260 L 405 265 L 385 260 L 370 245 L 365 225 L 365 200 L 370 175 L 375 155 Z"
                fill="url(#mapGradient)"
                stroke="#c9983a"
                strokeWidth="1"
                opacity="0.75"
                filter="url(#glow)"
              />

              {/* Asia */}
              <path
                d="M 480 60 L 520 55 L 560 60 L 590 70 L 610 85 L 625 105 L 630 125 L 625 145 L 610 160 L 585 170 L 555 175 L 525 170 L 495 160 L 475 140 L 465 115 L 465 90 L 470 70 Z"
                fill="url(#mapGradient)"
                stroke="#c9983a"
                strokeWidth="1"
                opacity="0.85"
                filter="url(#glow)"
              />

              {/* Australia */}
              <path
                d="M 600 240 L 630 235 L 655 240 L 670 255 L 675 275 L 670 290 L 650 300 L 625 300 L 605 290 L 595 270 L 595 255 Z"
                fill="url(#mapGradient)"
                stroke="#c9983a"
                strokeWidth="1"
                opacity="0.7"
                filter="url(#glow)"
              />

              {/* Golden Glow Points for Major Cities/Regions */}
              {/* Europe */}
              <circle cx="410" cy="95" r="5" fill="#c9983a" opacity="0.9">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
              </circle>
              
              {/* North America */}
              <circle cx="165" cy="115" r="4" fill="#d4af37" opacity="0.85">
                <animate attributeName="opacity" values="0.5;0.95;0.5" dur="2.5s" repeatCount="indefinite" />
              </circle>
              
              {/* Asia */}
              <circle cx="560" cy="110" r="6" fill="#c9983a" opacity="0.95">
                <animate attributeName="opacity" values="0.7;1;0.7" dur="1.8s" repeatCount="indefinite" />
              </circle>
              
              {/* South America */}
              <circle cx="195" cy="240" r="3.5" fill="#d4af37" opacity="0.8">
                <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2.2s" repeatCount="indefinite" />
              </circle>
              
              {/* Australia */}
              <circle cx="640" cy="270" r="4" fill="#c9983a" opacity="0.8">
                <animate attributeName="opacity" values="0.6;0.95;0.6" dur="2.3s" repeatCount="indefinite" />
              </circle>

              {/* Africa */}
              <circle cx="410" cy="200" r="3.5" fill="#d4af37" opacity="0.75">
                <animate attributeName="opacity" values="0.5;0.85;0.5" dur="2.4s" repeatCount="indefinite" />
              </circle>

              {/* Connection Lines between regions (subtle) */}
              <line x1="410" y1="95" x2="560" y2="110" stroke="#c9983a" strokeWidth="0.5" opacity="0.3" strokeDasharray="3,3">
                <animate attributeName="opacity" values="0.1;0.3;0.1" dur="3s" repeatCount="indefinite" />
              </line>
              <line x1="165" y1="115" x2="410" y2="95" stroke="#d4af37" strokeWidth="0.5" opacity="0.3" strokeDasharray="3,3">
                <animate attributeName="opacity" values="0.1;0.3;0.1" dur="3.5s" repeatCount="indefinite" />
              </line>
              <line x1="560" y1="110" x2="640" y2="270" stroke="#c9983a" strokeWidth="0.5" opacity="0.3" strokeDasharray="3,3">
                <animate attributeName="opacity" values="0.1;0.3;0.1" dur="3.2s" repeatCount="indefinite" />
              </line>
            </svg>

            {/* Map Info Overlay */}
            <div className="absolute top-2 right-2 md:top-4 md:right-4 flex flex-col gap-1.5 md:gap-1">
              <div className="w-10 h-10 md:w-8 md:h-8 rounded-[8px] backdrop-blur-[25px] bg-white/[0.2] border border-white/30 flex items-center justify-center text-white font-bold text-[14px] md:text-[11px] hover:bg-white/[0.3] active:bg-white/[0.4] transition-all cursor-pointer touch-manipulation">
                +
              </div>
              <div className="w-10 h-10 md:w-8 md:h-8 rounded-[8px] backdrop-blur-[25px] bg-white/[0.2] border border-white/30 flex items-center justify-center text-white font-bold text-[14px] md:text-[11px] hover:bg-white/[0.3] active:bg-white/[0.4] transition-all cursor-pointer touch-manipulation">
                −
              </div>
            </div>
          </div>

          {/* Country Bars */}
          <div className="space-y-2 max-h-[250px] md:max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {contributorsByRegion.map((region) => (
              <div key={region.name} className="flex items-center gap-2 md:gap-3 group">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5 gap-2">
                    <span className={`text-[12px] md:text-[13px] font-semibold transition-colors truncate ${
                      theme === 'dark' ? 'text-[#f5f5f5]' : 'text-[#2d2820]'
                    }`}>{region.name}</span>
                    <span className="text-[11px] md:text-[12px] font-bold text-[#c9983a] flex-shrink-0">{region.value}</span>
                  </div>
                  <div className="h-5 md:h-6 rounded-[6px] backdrop-blur-[15px] bg-white/[0.08] border border-white/15 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#c9983a] to-[#d4af37] rounded-[6px] transition-all duration-500 group-hover:shadow-[0_0_15px_rgba(201,152,58,0.5)]"
                      style={{ width: `${region.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Contributor Activity */}
        <div className="backdrop-blur-[40px] bg-white/[0.12] rounded-[16px] md:rounded-[24px] border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-4 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-0 mb-4 md:mb-6">
            <h2 className={`text-[16px] md:text-[18px] font-bold transition-colors ${
              theme === 'dark' ? 'text-[#f5f5f5]' : 'text-[#2d2820]'
            }`}>Contributor activity</h2>
            <div className="relative">
              <button
                onClick={() => setShowContributorIntervalDropdown(!showContributorIntervalDropdown)}
                className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-[8px] md:rounded-[10px] backdrop-blur-[20px] bg-white/[0.15] border border-white/25 hover:bg-white/[0.2] transition-all w-full sm:w-auto touch-manipulation"
              >
                <span className={`text-[12px] md:text-[13px] font-semibold transition-colors ${
                  theme === 'dark' ? 'text-[#f5f5f5]' : 'text-[#2d2820]'
                }`}>{contributorInterval}</span>
                <ChevronDown className={`w-4 h-4 transition-colors flex-shrink-0 ${
                  theme === 'dark' ? 'text-[#d4d4d4]' : 'text-[#7a6b5a]'
                }`} />
              </button>
              {showContributorIntervalDropdown && (
                <div className="absolute right-0 sm:right-0 left-0 sm:left-auto mt-2 w-full sm:w-[180px] backdrop-blur-[30px] bg-white/[0.55] border-2 border-white/30 rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.15)] overflow-hidden z-50">
                  <button
                    onClick={() => {
                      setContributorInterval('Daily interval');
                      setShowContributorIntervalDropdown(false);
                    }}
                    className="w-full px-4 py-3 text-left text-[13px] font-medium text-[#2d2820] hover:bg-white/[0.3] transition-all touch-manipulation"
                  >
                    Daily interval
                  </button>
                  <button
                    onClick={() => {
                      setContributorInterval('Weekly interval');
                      setShowContributorIntervalDropdown(false);
                    }}
                    className="w-full px-4 py-3 text-left text-[13px] font-medium text-[#2d2820] hover:bg-white/[0.3] transition-all touch-manipulation"
                  >
                    Weekly interval
                  </button>
                  <button
                    onClick={() => {
                      setContributorInterval('Monthly interval');
                      setShowContributorIntervalDropdown(false);
                    }}
                    className={`w-full px-4 py-3 text-left text-[13px] font-medium transition-all touch-manipulation ${
                      contributorInterval === 'Monthly interval'
                        ? 'bg-white/[0.35] text-[#2d2820] font-bold'
                        : 'text-[#2d2820] hover:bg-white/[0.3]'
                    }`}
                  >
                    Monthly interval
                  </button>
                  <button
                    onClick={() => {
                      setContributorInterval('Quarterly interval');
                      setShowContributorIntervalDropdown(false);
                    }}
                    className="w-full px-4 py-3 text-left text-[13px] font-medium text-[#2d2820] hover:bg-white/[0.3] transition-all touch-manipulation"
                  >
                    Quarterly interval
                  </button>
                  <button
                    onClick={() => {
                      setContributorInterval('Yearly interval');
                      setShowContributorIntervalDropdown(false);
                    }}
                    className="w-full px-4 py-3 text-left text-[13px] font-medium text-[#2d2820] hover:bg-white/[0.3] transition-all touch-manipulation"
                  >
                    Yearly interval
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Chart */}
          <div className="h-[240px] md:h-[280px] mb-4 md:mb-6 overflow-x-auto">
            <div className="min-w-[600px] md:min-w-0 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={contributorActivityData}>
                  <defs>
                    <linearGradient id="contributorBarGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#c9983a" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#d4af37" stopOpacity={0.4} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(122, 107, 90, 0.1)" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#7a6b5a" 
                    tick={{ fill: '#7a6b5a', fontSize: isMobile ? 9 : 11, fontWeight: 600 }}
                    angle={-45}
                    textAnchor="end"
                    height={isMobile ? 60 : 80}
                  />
                  <YAxis stroke="#7a6b5a" tick={{ fill: '#7a6b5a', fontSize: isMobile ? 9 : 11, fontWeight: 600 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="value" 
                    fill="url(#contributorBarGradient)" 
                    radius={[8, 8, 0, 0]}
                    maxBarSize={isMobile ? 30 : 40}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="trend" 
                    stroke="#2d2820" 
                    strokeWidth={isMobile ? 2 : 3}
                    dot={false}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => toggleContributorFilter('new')}
              className={`px-3 md:px-4 py-2 rounded-[8px] md:rounded-[10px] text-[12px] md:text-[13px] font-semibold transition-all touch-manipulation ${
                contributorFilters.new
                  ? 'bg-[#c9983a] text-white shadow-[0_3px_12px_rgba(201,152,58,0.3)]'
                  : 'backdrop-blur-[20px] bg-white/[0.15] border border-white/25 text-[#2d2820] hover:bg-white/[0.2]'
              }`}
            >
              New
            </button>
            <button
              onClick={() => toggleContributorFilter('reactivated')}
              className={`px-3 md:px-4 py-2 rounded-[8px] md:rounded-[10px] text-[12px] md:text-[13px] font-semibold transition-all touch-manipulation ${
                contributorFilters.reactivated
                  ? 'bg-[#c9983a] text-white shadow-[0_3px_12px_rgba(201,152,58,0.3)]'
                  : 'backdrop-blur-[20px] bg-white/[0.15] border border-white/25 text-[#2d2820] hover:bg-white/[0.2]'
              }`}
            >
              Reactivated
            </button>
            <button
              onClick={() => toggleContributorFilter('active')}
              className={`px-3 md:px-4 py-2 rounded-[8px] md:rounded-[10px] text-[12px] md:text-[13px] font-semibold transition-all touch-manipulation ${
                contributorFilters.active
                  ? 'bg-[#c9983a] text-white shadow-[0_3px_12px_rgba(201,152,58,0.3)]'
                  : 'backdrop-blur-[20px] bg-white/[0.15] border border-white/25 text-[#2d2820] hover:bg-white/[0.2]'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => toggleContributorFilter('churned')}
              className={`px-3 md:px-4 py-2 rounded-[8px] md:rounded-[10px] text-[12px] md:text-[13px] font-semibold transition-all touch-manipulation ${
                contributorFilters.churned
                  ? 'bg-[#c9983a] text-white shadow-[0_3px_12px_rgba(201,152,58,0.3)]'
                  : 'backdrop-blur-[20px] bg-white/[0.15] border border-white/25 text-[#2d2820] hover:bg-white/[0.2]'
              }`}
            >
              Churned
            </button>
            <button
              onClick={() => toggleContributorFilter('prMerged')}
              className={`px-3 md:px-4 py-2 rounded-[8px] md:rounded-[10px] text-[12px] md:text-[13px] font-semibold transition-all touch-manipulation ${
                contributorFilters.prMerged
                  ? 'bg-[#c9983a] text-white shadow-[0_3px_12px_rgba(201,152,58,0.3)]'
                  : 'backdrop-blur-[20px] bg-white/[0.15] border border-white/25 text-[#2d2820] hover:bg-white/[0.2]'
              }`}
            >
              PR merged
            </button>
          </div>
        </div>

        {/* Information Panel */}
        <div className="backdrop-blur-[40px] bg-white/[0.12] rounded-[16px] md:rounded-[24px] border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-4 md:p-8">
          <h2 className={`text-[16px] md:text-[18px] font-bold mb-4 md:mb-6 transition-colors ${
            theme === 'dark' ? 'text-[#f5f5f5]' : 'text-[#2d2820]'
          }`}>Information</h2>

          {/* Info Text */}
          <div className="mb-4 md:mb-6 p-4 md:p-5 rounded-[12px] md:rounded-[16px] backdrop-blur-[20px] bg-white/[0.15] border border-white/25">
            <div className="flex items-start gap-2 md:gap-3">
              <Info className="w-4 h-4 md:w-5 md:h-5 text-[#c9983a] flex-shrink-0 mt-0.5" />
              <p className={`text-[12px] md:text-[14px] leading-relaxed transition-colors ${
                theme === 'dark' ? 'text-[#d4d4d4]' : 'text-[#4a3f2f]'
              }`}>
                Only data from contributors who have completed a KYC are included. Contributors without a completed KYC are excluded from the map.
              </p>
            </div>
          </div>

          {/* Contributor Stats */}
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center justify-between p-4 md:p-6 rounded-[12px] md:rounded-[16px] backdrop-blur-[25px] bg-gradient-to-br from-white/[0.2] to-white/[0.12] border-2 border-white/30 shadow-[0_6px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_32px_rgba(201,152,58,0.15)] transition-all group">
              <div className="flex-1 min-w-0">
                <h3 className={`text-[12px] md:text-[14px] font-bold uppercase tracking-wider mb-1 md:mb-2 transition-colors ${
                  theme === 'dark' ? 'text-[#d4d4d4]' : 'text-[#7a6b5a]'
                }`}>Contributors with billing profile</h3>
                <div className={`text-[32px] md:text-[42px] font-black leading-none transition-colors ${
                  theme === 'dark' ? 'text-[#f5f5f5]' : 'bg-gradient-to-r from-[#2d2820] to-[#c9983a] bg-clip-text text-transparent'
                }`}>
                  0 / 0
                </div>
              </div>
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-[12px] md:rounded-[16px] bg-gradient-to-br from-[#c9983a]/30 to-[#d4af37]/20 border-2 border-[#c9983a]/50 flex items-center justify-center shadow-[0_4px_16px_rgba(201,152,58,0.25)] group-hover:scale-110 group-hover:shadow-[0_6px_24px_rgba(201,152,58,0.4)] transition-all duration-300 flex-shrink-0 ml-2">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-[#c9983a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>

            {/* Additional Stats Placeholder */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="p-4 md:p-5 rounded-[12px] md:rounded-[14px] backdrop-blur-[20px] bg-white/[0.15] border border-white/25 hover:bg-white/[0.2] transition-all group cursor-pointer">
                <div className={`text-[10px] md:text-[11px] font-bold uppercase tracking-wider mb-1 md:mb-2 transition-colors ${
                  theme === 'dark' ? 'text-[#d4d4d4]' : 'text-[#7a6b5a]'
                }`}>Active</div>
                <div className={`text-[24px] md:text-[28px] font-black transition-colors ${
                  theme === 'dark' ? 'text-[#f5f5f5] group-hover:text-[#c9983a]' : 'text-[#2d2820] group-hover:text-[#c9983a]'
                }`}>0</div>
              </div>
              <div className="p-4 md:p-5 rounded-[12px] md:rounded-[14px] backdrop-blur-[20px] bg-white/[0.15] border border-white/25 hover:bg-white/[0.2] transition-all group cursor-pointer">
                <div className={`text-[10px] md:text-[11px] font-bold uppercase tracking-wider mb-1 md:mb-2 transition-colors ${
                  theme === 'dark' ? 'text-[#d4d4d4]' : 'text-[#7a6b5a]'
                }`}>Total</div>
                <div className={`text-[24px] md:text-[28px] font-black transition-colors ${
                  theme === 'dark' ? 'text-[#f5f5f5] group-hover:text-[#c9983a]' : 'text-[#2d2820] group-hover:text-[#c9983a]'
                }`}>0</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(201, 152, 58, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(201, 152, 58, 0.7);
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .touch-manipulation {
          touch-action: manipulation;
        }
      `}</style>
    </div>
  );
}