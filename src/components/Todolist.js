import React, {useState} from "react";
import "../App.css"

export default function Todolist() {
  const [inputValue, setInputValue] = useState("");
  const [deadline, setDeadline] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  function handleInputValueChange(event) {
    setInputValue(event.target.value);
  }
  function handleDeadlineChange(event) {
    setDeadline(event.target.value);
  }
  function handleKeyPress(event) {
    if (event.key === "Enter") {
      if (editIndex !== null) {
        handleUpdateTodo();
      } else {
        handleAddTodo();
      }
    }
  }
  function handleAddTodo() {
    const newTodo = {
      task: inputValue,
      deadline: formatDate(deadline),
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInputValue("");
    setDeadline(new Date().toISOString().split("T")[0]);
  }

  function handleEditTodo(index) {
    const todoToEdit = todos[index];
    setInputValue(todoToEdit.task);
    setDeadline(todoToEdit.deadline);
    setEditIndex(index);
  }
  function handleUpdateTodo() {
    if (inputValue.trim() !== "") {
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = {
        ...updatedTodos[editIndex],
        task: inputValue,
        deadline: deadline,
      };
      setTodos(updatedTodos);
      setInputValue("");
      setDeadline(new Date().toISOString().split("T")[0]);
      setEditIndex(null);
    }
  }
  function handleDeleteTodo(index) {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  }
  function handleCompleteTodo(index) {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  }
  function formatDate(dateString) {
    const today = new Date(dateString);
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    return ` ${day < 10 ? "0" + day : day}/${
      month < 10 ? "0" + month : month
    }/${year}`;
  }
  return (
    <div className="todolist-container">
      <h1>Hey, What are you up to?</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputValueChange}
        onKeyDown={handleKeyPress}
        placeholder="Add a new todo"
        className="input-add"
      />
      <input
        type="date"
        value={deadline}
        onChange={handleDeadlineChange}
        onKeyDown={handleKeyPress}
        placeholder="Add a deadline"
        className="input-deadline"
      />
      {editIndex === null ? (
        <button onClick={handleAddTodo}>Add</button>
      ) : (
        <button onClick={handleUpdateTodo}>Update</button>
      )}

      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className={todo.completed ? "completed" : ""}>
            <span className="task">{todo.task}</span>
            <span className="deadline">{todo.deadline}</span>
            <button onClick={() => handleEditTodo(index)}>Edit</button>
            <button onClick={() => handleDeleteTodo(index)}>Delete</button>
            <button onClick={() => handleCompleteTodo(index)}>
              {todo.completed ? "Undo" : "Complete"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
