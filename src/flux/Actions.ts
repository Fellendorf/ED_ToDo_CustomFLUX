import Dispatcher from "./Dispatcher";
import { ITodoItem } from "./TodoStore";

export enum ActionTypes {
  ADD_TODO_ITEM,
  DELETE_TODO_ITEM,
}

export interface IAction<DataType> {
  type: ActionTypes;
  data: DataType;
}

export const Actions = {
  addTodo(todoItem: ITodoItem) {
    Dispatcher.dispatch({
      type: ActionTypes.ADD_TODO_ITEM,
      data: todoItem,
    });
  },
  deleteTodo(id: number) {
    Dispatcher.dispatch({
      type: ActionTypes.DELETE_TODO_ITEM,
      data: { id },
    });
  },
};
