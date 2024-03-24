export interface SendEmailDto {
  sender?: {
    name: string;
    email: string;
  };
  to: {
    email: string;
    name: string;
  }[];
  subject: string;
  htmlContent: string;
}
