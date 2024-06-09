import Actions from "../flux/Actions";

function Input() {
  const onClick = () => {
    Actions.addTodoItem({
      id: new Date().getTime(),
      text: "More text",
      title: "More title",
    });
  };

  return (
    <>
      <input name="title" id="form_input_title" />
      <button type="submit" id="addBtn" onClick={onClick}>
        Add Todo
      </button>
    </>
  );
}

export default Input;
