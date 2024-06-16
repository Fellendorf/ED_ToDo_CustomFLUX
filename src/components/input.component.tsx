import "./input.component.css";

import { useState } from "react";
import Actions from "../flux/Actions";

function Input() {
  const [todoText, setTodoText] = useState("");

  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.target.value);
  };

  const addTodoItem = () => {
    Actions.addTodoItem({
      id: new Date().getTime(),
      date: new Date().getTime(),
      text: todoText || "No Text",
    });
    setTodoText("");
  };

  return (
    <div className="add-todo">
      <button type="submit" onClick={addTodoItem}>
        ADD
      </button>
      <input
        name="todo-text"
        placeholder="type todo here"
        value={todoText}
        onChange={onTextChange}
      />
    </div>
  );
}

export default Input;
