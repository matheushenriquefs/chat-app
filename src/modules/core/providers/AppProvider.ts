import type { App } from 'vue'

import { DateTimeDateFnsHelper } from '@/modules/core/helpers/DateTimeDateFnsHelper'

export class AppProvider {
  constructor(private readonly app: App<Element>) {
    this.app = app
  }

  public async setupDI(): Promise<void> {
    this.app.provide('@/core/composables/facades/DateTime', new DateTimeDateFnsHelper())
  }
}
