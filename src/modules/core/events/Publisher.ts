type Subscription = {
  topic: string
  callback: (...data: unknown[]) => void
}

type SubscriptionIds = {
  [id: number]: Subscription
}

type Subscriptions = Map<Subscription['topic'], Set<Subscription['callback']>>

export class Publisher {
  private subscriptions: Subscriptions

  constructor() {
    this.subscriptions = new Map()
  }
}
