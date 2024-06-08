import { IAction } from "./Actions";
import Store from "./Store";

class Dispatcher {
  private stores: Store[] = [];
  private static instance: Dispatcher;

  constructor() {
    if (Dispatcher.instance) {
      return Dispatcher.instance;
    }
    Dispatcher.instance = this;
  }

  public register(store: Store) {
    this.stores.push(store);
  }

  public dispatch<TPayload>(action: IAction<TPayload>) {
    this.stores.forEach((store) => store.update(action));
  }
}

export default new Dispatcher();
