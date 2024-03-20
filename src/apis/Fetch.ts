import QS from 'qs';
import { setCookies } from 'src/utils/cookieManager';

type RequestMethods = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface MyHeaders extends Headers {
  map: {
    [key: string]: string;
    ['set-cookie']: string;
  };
}
// interface MyResponse extends Response {
//   headers: MyHeaders;
// }

interface MyResponse<D> {
  data: D;
  code: number;
  msg: string;
  success: boolean;
}
// fetch.interceptors.request.use(function (config) {
// return {...config, customConfig};
// })
// fetch.interceptors.response.use(function (response) {
// // xxx // return response;
// })
// 封装自定义的fetch请求，最好是封装成一个类，初始化时接收默认的参数
// 对于每一个实例，都有自己的abort方法，可以随时终止该请求
// 每一个实例上都有 interceptors 属性，属性包括 request 和 response两个对象，对象只有一个use（或者add,push）方法
// request.use 增加的回调，会在请求之前调用，传入默认的config配置
interface RequestConfig extends RequestInit {
  url?: URL | string;
  baseUrl?: string;
}

interface FetchConfig<B> extends Omit<RequestConfig, 'url' | 'method' | 'body'> {
  data?: B;
  params?: B;
}

type RequestResolveCallback = (config: RequestConfig) => RequestConfig | Promise<RequestConfig>;
type RequestRejectCallback = (config: RequestConfig) => Error;
type ResponseResolveCallback = (response: Response) => Response;
type ResponseRejectCallback = (response: Error) => Error;

interface RequestInterceptor {
  use: (resolveCallback: RequestResolveCallback, rejectCallback?: RequestRejectCallback) => void;
}

interface ResponseInterceptor {
  use: (resolveCallback: ResponseResolveCallback, rejectCallback?: ResponseRejectCallback) => void;
}

interface Interceptors {
  response: ResponseInterceptor;
  request: RequestInterceptor;
}

export default class MyFetch {
  public interceptors: Interceptors;
  private config: RequestConfig;
  private requestResolveInterceptors: RequestResolveCallback[];
  private responseResolveInterceptors: ResponseResolveCallback[];
  private requestRejectInterceptors: RequestRejectCallback[];
  private responseRejectInterceptors: ResponseRejectCallback[];

  constructor(config: RequestConfig) {
    this.config = config;
    this.requestResolveInterceptors = [];
    this.responseResolveInterceptors = [];
    this.requestRejectInterceptors = [];
    this.responseRejectInterceptors = [];

    this.interceptors = {
      response: {
        use: (callback, errorCallback) => {
          this.responseResolveInterceptors.push(callback);

          errorCallback && this.responseRejectInterceptors.push(errorCallback);
        },
      },
      request: {
        use: (callback, errorCallback) => {
          this.requestResolveInterceptors.push(callback);
          errorCallback && this.requestRejectInterceptors.push(errorCallback);
        },
      },
    };
  }

  async fetch<T, D>(
    url: string,
    method: RequestMethods,
    data?: T,
    options?: Omit<FetchConfig<any>, 'body'>,
  ): Promise<MyResponse<D>> {
    const config = this.requestResolveInterceptors.reduce((prev, current) => {
      return { ...prev, ...current(this.config) };
    }, this.config);

    const { baseUrl, ...resetConfig } = config;

    const init = { ...resetConfig, ...options, method };

    if (data) {
      init.body = JSON.stringify(data);
    }

    if (baseUrl) {
      url = `${baseUrl}${url}`;
    }

    if (init.method === 'POST') {
      init.headers = {
        ...(init.headers || {}),
        'Content-Type': 'application/json;charset=utf-8',
      };
    }
    try {
      const response = await fetch(url, init).then((res: any) => {
        if (res.status !== 200 && res.status !== 201) {
          return Promise.reject(res.statusText);
        }

        if (res.headers.map['set-cookie']) {
          const cookies = res.headers.map['set-cookie'] as string;
          const result: Record<string, string> = {};
          cookies.split(';').forEach((item) => {
            if (!item) return;
            const [key, value] = item.split('=');
            result[key] = value;
          });
          setCookies(result);
        }
        return res.json();
      });

      if (response.code !== 200 && response.code !== 201 && response.code !== 0) {
        throw new Error(response.message);
      }

      return this.responseResolveInterceptors.reduce((prevResponse, currentCallback) => {
        return currentCallback(prevResponse);
      }, response);
    } catch (error) {
      this.responseRejectInterceptors.reduce((prevResponse, currentCallback) => {
        currentCallback(prevResponse);
        return prevResponse;
      }, error as Error);
      return Promise.reject();
    }
  }

  // data改为query,类型为键值对
  get<Response, Request = undefined>(url: string, options?: FetchConfig<Request>): Promise<MyResponse<Response>> {
    const { params, ...reset } = options || ({} as FetchConfig<Request>);
    const realUrl = params ? `${url}?${QS.stringify(params)}` : url;
    return this.fetch<Request, Response>(realUrl, 'GET', undefined, reset);
  }

  // 参数改为params,类型为any
  post<Response, Request = undefined>(url: string, options?: FetchConfig<Request>): Promise<MyResponse<Response>> {
    const { data, ...reset } = options || ({} as FetchConfig<Request>);
    return this.fetch<Request, Response>(url, 'POST', data, reset);
  }

  put<Response, Request = undefined>(url: string, options?: FetchConfig<Request>): Promise<MyResponse<Response>> {
    const { data, ...reset } = options || ({} as FetchConfig<Request>);
    return this.fetch<Request, Response>(url, 'PUT', data, reset);
  }

  delete<Response, Request = undefined>(url: string, options?: FetchConfig<Request>): Promise<MyResponse<Response>> {
    const { data, ...reset } = options || ({} as FetchConfig<Request>);
    return this.fetch<Request, Response>(url, 'DELETE', data, reset);
  }
}
