export type APIResponse<T = any> = {
  resultObject: ResultObject;
  error: ErrorResponse;
  message: string;
  status: number;
  success: boolean;
};

export type ResultObject<T = any> = {
  data: T;
  currentPage: number;
  pageCount: number;
  pageSize: number;
  rowCount: number;
  firstRowOnPage: number;
  lastRowOnPage: number;
};

export type ErrorResponse = {
  errorCode: number;
  message: string;
};
