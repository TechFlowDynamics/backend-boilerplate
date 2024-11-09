export interface EmailBodyInterface {
  addresses: string;
  ccAddresses: string;
  body: string;
  subject: string;
}

export interface EmailParams {
  to: [string];
  subject: string;
  html: string;
}
