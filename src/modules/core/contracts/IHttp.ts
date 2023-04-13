import type { CreateAxiosDefaults, AxiosRequestConfig, AxiosResponse } from 'axios'

export interface IHttpDefaultMacroOptions<D = any> extends CreateAxiosDefaults<D> {}
export interface IHttpRequestOptions<D = any> extends AxiosRequestConfig<D> {}
export interface IHttpResponse<T = any, D = any> extends AxiosResponse<T, D> {}

export interface IHttp {
  setMacro(name: string, options: IHttpDefaultMacroOptions): void
  get<T = any, R = IHttpResponse<T>, D = any>(
    url: string,
    config?: IHttpRequestOptions<D>
  ): Promise<R>
  post<T = any, R = IHttpResponse<T>, D = any>(
    url: string,
    data?: D,
    options?: IHttpRequestOptions<D>
  ): Promise<R>
}
