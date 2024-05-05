import Todolist from "./components/Todolist";
import Signup from "./components/Signup";
import "./App.css";

function App() {
  return (
    <div>
      <header className="App-header">
        <h1>Project 1: To do App</h1>
      </header>
      <Signup />
      <Todolist />
    </div>
  );
}

export default App;
