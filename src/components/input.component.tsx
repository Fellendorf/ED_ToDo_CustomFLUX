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
    <>
      <input name="todo-text" value={todoText} onChange={onTextChange} />
      <button type="submit" id="addBtn" onClick={addTodoItem}>
        Add Todo
      </button>
    </>
  );
}

export default Input;
