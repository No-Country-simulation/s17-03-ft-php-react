import { getCookie } from 'cookies-next';
import { EHttpMethod } from '@/types';

const useHttpService = () => {
  const baseURL = process.env.BASE_URL || 'https://jsonplaceholder.typicode.com';

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
    options?: RequestInit // eslint-disable-line no-undef
  ): Promise<T> => {
    try {
      const response = await fetch(`${baseURL}${url}`, {
        method,
        ...options,
      });

      if (!response.ok) {
        throw new Error('An error occurred while fetching the data.');
      }

      const data: T = (await response.json()) as T;
      return data;
    } catch (error) {
      console.error('Fetch error: ', error);
      throw error;
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
