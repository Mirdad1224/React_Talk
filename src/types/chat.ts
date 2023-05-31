export interface IChatElement {
  type: string;
  message?: string;
  incoming?: boolean;
  outgoing?: boolean;
  text?: string;
  subtype?: string;
  img?: string;
  preview?: string;
  reply?: string;
}
