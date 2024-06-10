import todoApiService from "../services/todoApi";
import dispatcher from "./Dispatcher";
import { ITodoItem } from "./TodoStore";

export enum ActionTypes {
  TODO_FETCH_ITEMS,
  TODO_RECEIVED_ITEMS,
  TODO_ADD_ITEM,
  TODO_DELETE_ITEM,
  ERROR,
}

export interface IAction<TPayload> {
  type: ActionTypes;
  data?: TPayload;
}

class Actions {
  public getTodoItems() {
    dispatcher.dispatch({
      type: ActionTypes.TODO_FETCH_ITEMS,
    });
    return todoApiService
      .getTodoItems()
      .then(({ statusCode, body }) => this.errorHandler(statusCode, body))
      .then((body) => {
        dispatcher.dispatch({
          type: ActionTypes.TODO_RECEIVED_ITEMS,
          data: JSON.parse(body),
        });
      })
      .catch((error) => {
        dispatcher.dispatch({
          type: ActionTypes.ERROR,
          data: error,
        });
      });
  }

  public addTodoItem(todoItem: ITodoItem) {
    dispatcher.dispatch({
      type: ActionTypes.TODO_ADD_ITEM,
      data: todoItem,
    });
    return todoApiService
      .createTodoItem(todoItem)
      .then(({ statusCode, body }) => this.errorHandler(statusCode, body))
      .then((body) => {
        dispatcher.dispatch({
          type: ActionTypes.TODO_RECEIVED_ITEMS,
          data: JSON.parse(body),
        });
      })
      .catch((error) => {
        dispatcher.dispatch({
          type: ActionTypes.ERROR,
          data: error,
        });
      });
  }

  public deleteTodoItem(id: number) {
    dispatcher.dispatch({
      type: ActionTypes.TODO_DELETE_ITEM,
      data: { id },
    });
    return todoApiService
      .deleteTodoItem(id)
      .then(({ statusCode, body }) => this.errorHandler(statusCode, body))
      .then((body) => {
        dispatcher.dispatch({
          type: ActionTypes.TODO_RECEIVED_ITEMS,
          data: JSON.parse(body),
        });
      })
      .catch((error) => {
        dispatcher.dispatch({
          type: ActionTypes.ERROR,
          data: error,
        });
      });
  }

  private errorHandler(statusCode: number, body: string) {
    if (statusCode !== 201 && statusCode !== 200) {
      throw new Error(
        `Response is not received from the server. Status Code: ${statusCode}`
      );
    }
    if (!body) {
      throw new Error(`Response doesn't contain body`);
    }
    return Promise.resolve(body);
  }
}

export default new Actions();
