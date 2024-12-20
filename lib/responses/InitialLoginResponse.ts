export interface InitialLoginResponse {
    message: string;
    messageType: string;
    status: string;
    method: string;
    tempBearerToken: string;
    confirmation_url: string;
    approval_id: number;
    alternativeMethods: [];
  };