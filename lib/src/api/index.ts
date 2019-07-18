import { API } from 'aws-amplify';

export type ApiRequestType = 'get' | 'post' | 'put' | 'patch' | 'del';

export const api = async <RequestT, ResponseT>(
  apiName: string,
  method: ApiRequestType,
  path: string,
  data?: RequestT
): Promise<ResponseT> => API[method](apiName, path, data);
