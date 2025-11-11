export interface Alert {
  id: number;
  message: string;
  type: "success" | "error" | "info" | "warning";
  title?: string;
  duration?: number;
  closable?: boolean;
}
