import type { App } from 'vue'
import VueTelInput from 'vue-tel-input'

import { HttpAxiosClient } from '@/modules/core/clients/HttpAxiosClient'
import { DateTimeDateFnsHelper } from '@/modules/core/helpers/DateTimeDateFnsHelper'

type Plugin = { install: (app: App<any>) => any }

export class AppProvider {
  constructor(private readonly app: App<Element>) {
    this.app = app
  }

  public async setupDI(): Promise<void> {
    const Http = HttpAxiosClient.getInstance()
    Http.setMacro('default', {
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        common: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    })
    this.app.provide('@/core/composables/facades/Http', Http)
    this.app.provide('@/core/composables/facades/DateTime', new DateTimeDateFnsHelper())
  }

  public async setupPlugin(): Promise<void> {
    const vueTelInput = VueTelInput as unknown as Plugin
    this.app.use(vueTelInput)
  }
}
