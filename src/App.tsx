import "./App.css";

import Input from "./components/input.component";
import TodoList from "./components/todoList.component";

function App() {
  return (
    <>
      <header>
        <h1>TODO List</h1>
        <h2>
          <span>React +</span>
          <span>Custom Flux Implementation</span>
        </h2>
      </header>
      <TodoList />
      <Input />
    </>
  );
}

export default App;
