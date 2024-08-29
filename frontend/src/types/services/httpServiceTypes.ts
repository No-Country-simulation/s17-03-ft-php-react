export interface IParams {
  [key: string]: string;
}

export interface IGenericOptions {
  url: string;
  params?: IParams;
}

export interface IErrorResponse {
  status: string;
  message: string;
}
