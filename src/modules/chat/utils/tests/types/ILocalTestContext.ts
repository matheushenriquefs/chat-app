import type { TestContext } from 'vitest'

export interface ILocalTestContext extends TestContext {
  options: {
    render: {
      global: {
        plugins: any[]
      }
    }
  }
  store: any
}
