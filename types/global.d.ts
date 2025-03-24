export {};

declare global {
  interface Window {
    trackLeadForm?: () => void;
  }
}