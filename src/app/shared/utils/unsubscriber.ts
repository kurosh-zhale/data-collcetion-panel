import { Subscription } from 'rxjs';

export function unsubscribe(subscriptions: Subscription[]) {
  if (subscriptions.length !== 0)
    subscriptions.forEach((subscription) => subscription.unsubscribe());
}
