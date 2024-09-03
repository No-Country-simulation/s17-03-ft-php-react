import { getCookie } from 'cookies-next';
import { EHttpMethod } from '@/types';
import { env } from 'env';
const API_URL = env.API_URL;

const useHttpService = (BASE_URL: string = API_URL) => {
  const getAuthorization = (): Record<string, string> => {
    const accessToken = getCookie('AccessToken') || '';
    return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
  };

  const setupHeaders = (hasAttachment = false): Record<string, string> => {
    return hasAttachment
      ? { 'Content-Type': 'application/json', ...getAuthorization() }
      : { 'Content-Type': 'application/json' };
  };

  const request = async <T>(
    method: EHttpMethod,
    url: string,
    options?: {}
    // TODO: add types for next refactor
  ): Promise<
    T | { httpIsOk: string; httpStatus: string; response: string } | { error: string }
  > => {
    try {
      const response = await fetch(`${BASE_URL}${url}`, {
        method,
        ...options,
      });

      const data: T = (await response.json()) as T;

      if (!response.ok) {
        return {
          httpIsOk: `${response.ok}`,
          httpStatus: `${response.status}`,
          response: `${(data as { message: string }).message}`,
        };
      }

      return data;
    } catch (error) {
      return {
        error: (error as Error).message,
      };
    }
  };

  const get = async <T>(url: string, hasAttachment = false) => {
    return request<T>(EHttpMethod.GET, `${url}`, {
      headers: setupHeaders(hasAttachment),
    });
  };

  const push = async <T, P>(url: string, payload: P, hasAttachment = false) => {
    return request<T>(EHttpMethod.POST, `${url}`, {
      body: JSON.stringify(payload),
      headers: setupHeaders(hasAttachment),
    });
  };

  const update = async <T, P>(url: string, payload: P, hasAttachment = false) => {
    return request<T>(EHttpMethod.PUT, `${url}`, {
      body: JSON.stringify(payload),
      headers: setupHeaders(hasAttachment),
    });
  };

  const remove = async <T>(url: string, hasAttachment = false) => {
    return request<T>(EHttpMethod.DELETE, `${url}`, {
      headers: setupHeaders(hasAttachment),
    });
  };

  return { get, push, update, remove };
};

export default useHttpService;
