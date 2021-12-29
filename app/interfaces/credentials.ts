export interface ICredentials {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  // TODO: Remove user
  user: any;
}
