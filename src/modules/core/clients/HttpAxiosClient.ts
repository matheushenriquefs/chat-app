import axios from 'axios'

import type {
  IHttp,
  IHttpDefaultMacroOptions,
  IHttpRequestOptions,
  IHttpResponse
} from '@/modules/core/contracts/IHttp'

export class HttpAxiosClient implements IHttp {
  private static instance: HttpAxiosClient | null = null
  private macros: Map<'default' | string, IHttp> = new Map([
    ['default', axios.create({}) as unknown as IHttp]
  ])

  private constructor() {}

  static getInstance(): IHttp {
    if (!HttpAxiosClient.instance) {
      HttpAxiosClient.instance = new HttpAxiosClient()
    }

    return HttpAxiosClient.instance
  }

  withMacro(name: string = 'default'): IHttp {
    return this.macros.get(name) as IHttp
  }

  setMacro(name: string, options: IHttpDefaultMacroOptions = {}): void {
    this.macros.set(name, axios.create(options) as unknown as IHttp)
  }

  async get<T = any, R = IHttpResponse<T>, D = any>(
    url: string,
    options?: IHttpRequestOptions<D>
  ): Promise<R> {
    return this.withMacro().get(url, options)
  }

  async post<T = any, R = IHttpResponse<T>, D = any>(
    url: string,
    data?: D,
    options?: IHttpRequestOptions<D>
  ): Promise<R> {
    return this.withMacro().post(url, data, options)
  }
}
