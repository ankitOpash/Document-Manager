// vite-env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SERVER_URL: string;
    // add more variables here as needed
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  