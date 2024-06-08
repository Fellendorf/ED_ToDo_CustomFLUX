import { ActionTypes, IAction } from "./Actions";
import Dispatcher from "./Dispatcher";
import Store from "./Store";

export interface ITodoItem {
  id: number;
  title?: string;
  text?: string;
}

class TodoStore extends Store {
  private todos: ITodoItem[] = [];

  public update(action: IAction<ITodoItem>) {
    if (action.type === ActionTypes.ADD_TODO) {
      this.todos = [action.data, ...this.todos];
    }
    if (action.type === ActionTypes.DELETE_TODO) {
      this.todos = this.todos.filter(
        (todoItem) => todoItem.id !== action.data.id
      );
    }
    this.emitter.emit("change");
  }

  public getTodos() {
    return this.todos;
  }
}

export default new TodoStore(Dispatcher);
