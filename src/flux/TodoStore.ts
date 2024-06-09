import { ActionTypes, IAction } from "./Actions";
import Dispatcher from "./Dispatcher";
import Store from "./Store";

export interface ITodoItem {
  id: number;
  title?: string;
  text?: string;
}

class TodoStore extends Store {
  private items: ITodoItem[] = [];

  constructor(dispatcher: typeof Dispatcher) {
    super(dispatcher);
  }

  public update({ type, data }: IAction<ITodoItem | ITodoItem[]>) {
    if (data) {
      switch (type) {
        case ActionTypes.TODO_GET_ITEMS_END:
          this.items = data as ITodoItem[];
      }
    }
    if (type === ActionTypes.DELETE_TODO_ITEM) {
      if (data) {
        // this.items = this.items.filter((todoItem) => todoItem.id !== data.id);
      } else {
        // error: id is empty
      }
    }
    this.emitter.emit(this.changeEventName);
  }

  public getItems() {
    return this.items;
  }
}

export default new TodoStore(Dispatcher);
