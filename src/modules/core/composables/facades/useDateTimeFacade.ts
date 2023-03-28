import { inject } from 'vue'

import type { IDateTime } from '@/modules/core/contracts/IDateTime'

export const useDateTimeFacade = (): IDateTime | null =>
  inject<IDateTime | null>('@/core/composables/facades/DateTime', null)
