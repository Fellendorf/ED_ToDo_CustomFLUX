import { ActionTypes, IAction } from "./Actions";
import Dispatcher from "./Dispatcher";
import Store from "./Store";

export interface ITodoItem {
  id: number;
  date: number;
  text?: string;
}

class TodoStore extends Store {
  private items: ITodoItem[] = [];
  public readonly changeEventName = "todoChange";

  constructor(dispatcher: typeof Dispatcher) {
    super(dispatcher);
  }

  public update({ type, data }: IAction<ITodoItem | ITodoItem[]>) {
    if (data) {
      switch (type) {
        case ActionTypes.TODO_RECEIVED_ITEMS:
          this.items = data as ITodoItem[];
      }
    }
    this.emitter.emit(this.changeEventName);
  }

  public getTodoItems() {
    return this.items;
  }
}

export default new TodoStore(Dispatcher);
