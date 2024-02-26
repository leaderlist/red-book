import QS from 'qs';

type RequestMethods = 'GET' | 'POST' | 'PUT' | 'DELETE';
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

interface FetchConfig extends Omit<RequestConfig, 'url' | 'method' | 'body'> {}

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

  async fetch(url: string, method: RequestMethods, data?: BodyInit_ | null, options?: FetchConfig) {
    const config = this.requestResolveInterceptors.reduce((prev, current) => {
      console.log(prev, current(this.config));
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

    try {
      const response = await fetch(url, init).then((res) => {
        if (res.status !== 200) {
          console.log(44444, res.statusText);
          return Promise.reject(res.statusText);
        }
        return res.json();
      });

      return this.responseResolveInterceptors.reduce((prevResponse, currentCallback) => {
        return currentCallback(prevResponse);
      }, response);
    } catch (error) {
      const resultError = this.responseRejectInterceptors.reduce((prevResponse, currentCallback) => {
        return currentCallback(prevResponse);
      }, error as Error);
      return Promise.reject(resultError);
    }
  }

  // data改为query,类型为键值对
  get<Request, Response>(url: string, data?: Request | null, options?: FetchConfig): Promise<Response> {
    const realUrl = `${url}?${QS.stringify(data)}`;
    return this.fetch(realUrl, 'GET', null, options);
  }

  // 参数改为params,类型为any
  post(url: string, data?: BodyInit_ | null, options?: FetchConfig) {
    return this.fetch(url, 'POST', data, options);
  }

  put(url: string, data?: BodyInit_ | null, options?: FetchConfig) {
    return this.fetch(url, 'PUT', data, options);
  }

  delete(url: string, data?: BodyInit_ | null, options?: FetchConfig) {
    return this.fetch(url, 'DELETE', data, options);
  }
}
