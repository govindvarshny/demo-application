declare global {
  namespace NodeJS {
    interface Global {
      logout?: () => Promise<void>;
      HermesInternal?: object;
    }
  }
}
export {};
