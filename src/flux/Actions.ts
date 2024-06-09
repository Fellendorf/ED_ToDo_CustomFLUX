import todoApiService from "../services/todoApi";
import Dispatcher from "./Dispatcher";
import { ITodoItem } from "./TodoStore";

export enum ActionTypes {
  TODO_GET_ITEMS_START,
  TODO_GET_ITEMS_END,
  TODO_ADD_ITEM_START,
  DELETE_TODO_ITEM,
  ERROR,
}

export interface IAction<TPayload> {
  type: ActionTypes;
  data?: TPayload;
}
//TODO: convert to class
export const Actions = {
  getTodos() {
    Dispatcher.dispatch({
      type: ActionTypes.TODO_GET_ITEMS_START,
    });
    return todoApiService
      .getTodoItems()
      .then(({ statusCode, body }) => this._errorCatcher(statusCode, body))
      .then((body) => {
        Dispatcher.dispatch({
          type: ActionTypes.TODO_GET_ITEMS_END,
          data: JSON.parse(body),
        });
      })
      .catch((error) => {
        Dispatcher.dispatch({
          type: ActionTypes.ERROR, // For "Global state store"
          data: error,
        });
      });
  },
  addTodo(todoItem: ITodoItem) {
    Dispatcher.dispatch({
      type: ActionTypes.TODO_ADD_ITEM_START,
      data: todoItem,
    });
    todoApiService
      .createTodoItem(todoItem)
      .then(({ statusCode, body }) => this._errorCatcher(statusCode, body))
      .then((body) => {
        Dispatcher.dispatch({
          type: ActionTypes.TODO_GET_ITEMS_END,
          data: JSON.parse(body),
        });
      })
      .catch((error) => {
        Dispatcher.dispatch({
          type: ActionTypes.ERROR, // For "Global state store"
          data: error,
        });
      });
  },
  deleteTodo(id: number) {
    Dispatcher.dispatch({
      type: ActionTypes.DELETE_TODO_ITEM,
      data: { id },
    });
  },
  // rename
  _errorCatcher(statusCode: number, body: string) {
    if (statusCode !== 201 && statusCode !== 200) {
      throw new Error(
        `Response is not received from the server. Status Code: ${statusCode}`
      );
    }
    if (!body) {
      throw new Error(`Response doesn't contain body`);
    }
    return Promise.resolve(body);
  },
};
