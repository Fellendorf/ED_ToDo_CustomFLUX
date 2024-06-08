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

  public update(action: IAction<ITodoItem>) {
    if (action.type === ActionTypes.ADD_TODO_ITEM) {
      this.items = [action.data, ...this.items];
    }
    if (action.type === ActionTypes.DELETE_TODO_ITEM) {
      this.items = this.items.filter(
        (todoItem) => todoItem.id !== action.data.id
      );
    }
    this.emitter.emit("change");
  }

  public getItems() {
    return this.items;
  }
}

export default new TodoStore(Dispatcher);
