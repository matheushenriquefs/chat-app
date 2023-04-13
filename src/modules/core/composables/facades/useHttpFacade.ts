import { inject } from 'vue'

import type { IHttp } from '@/modules/core/contracts/IHttp'

export const useHttpFacade = (): IHttp | null =>
  inject<IHttp | null>('@/core/composables/facades/Http', null)
