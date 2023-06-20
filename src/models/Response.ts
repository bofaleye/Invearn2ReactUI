export interface Response<T = any> {
  timeStamp: string;
  errorFlag: boolean;
  payload: T;
  message: string;
  statusCode: number;
  detail: string;
  instance: string;
  validationErrors: [
    {
      entity: string;
      field: string;
      type: string;
      value: string;
      rawValue: string;
      error: string;
      code: string;
      description: string;
    }
  ];
}
