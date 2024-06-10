import { EventEmitter } from "events";
import { IAction } from "./Actions";
import Dispatcher from "./Dispatcher";

export default abstract class Store {
  public emitter = new EventEmitter();
  public abstract readonly changeEventName: string;

  constructor(dispatcher: typeof Dispatcher) {
    dispatcher.register(this);
  }

  public abstract update(action: IAction<any>): void;
}
