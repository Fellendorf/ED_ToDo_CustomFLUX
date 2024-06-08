import { useEffect, useState } from "react";
import todoStore from "./flux/TodoStore";
import { Actions } from "./flux/Actions";

function TodoList() {
  const [items, setItems] = useState(todoStore.getItems());

  const getItems = () => {
    setItems(todoStore.getItems());
  };

  const deleteItem = (id: number) => {
    return () => {
      Actions.deleteTodo(id);
    };
  };

  useEffect(() => {
    // React Note: the code in the callback will be run when component is mounted:
    todoStore.emitter.on(todoStore.changeEventName, getItems);

    // React Note: returned function will be called on component unmount:
    return () => {
      todoStore.emitter.removeListener(todoStore.changeEventName, getItems);
    };
    // React Note: If second parameter is passed (empty array here),
    // then main callback will be run only once when component is mounted:
  }, []);

  return (
    <>
      <ul>
        {items.map(({ id, title, text }) => (
          <li key={String(id)}>
            <h3>{title}</h3>
            <p>{text}</p>
            <button onClick={deleteItem(id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default TodoList;
