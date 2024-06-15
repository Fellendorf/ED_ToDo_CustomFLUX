import "./todoList.component.css";

import { useEffect, useState } from "react";
import moment from "moment";
import todoStore, { ITodoItem } from "../flux/TodoStore";
import Actions from "../flux/Actions";

function TodoList() {
  const [items, setItems] = useState([] as ITodoItem[]);

  const getItemsFromStore = () => {
    setItems(todoStore.getTodoItems());
  };

  const deleteItem = (id: number) => {
    return () => {
      Actions.deleteTodoItem(id);
    };
  };

  useEffect(() => {
    // React Note: the code in the callback will be run when component is mounted:
    todoStore.emitter.on(todoStore.changeEventName, getItemsFromStore);

    Actions.getTodoItems();

    // React Note: returned function will be called on component unmount:
    return () => {
      todoStore.emitter.removeListener(
        todoStore.changeEventName,
        getItemsFromStore
      );
    };
    // React Note: If second parameter is passed (empty array here),
    // then main callback will be run only once when component is mounted:
  }, []);

  return (
    <ul>
      {items.map(({ id, date, text }) => (
        <li key={String(id)}>
          <div className="text-area">
            <span>{text}</span>
            <span>({moment(date).format("YYYY-MM-DD")})</span>
          </div>
          <button onClick={deleteItem(id)} className="delete">
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
