/// <reference types="vite/client" />

interface StaticImageData {
  src: string;
  height: number;
  width: number;
  blurDataURL?: string;
}

declare module '*.svg' {
  const imageUrl: string;
  export default imageUrl;
}

declare module '*.png' {
  const imageUrl: string;
  export default imageUrl;
}

declare module '*.jpg' {
  const imageUrl: string;
  export default imageUrl;
}

declare module '*.jpeg' {
  const imageUrl: string;
  export default imageUrl;
}

declare module '*.gif' {
  const imageUrl: string;
  export default imageUrl;
}

declare module '*.webp' {
  const imageUrl: string;
  export default imageUrl;
}
