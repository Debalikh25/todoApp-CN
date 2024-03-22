import { useState, useEffect } from "react";
import AddTodo from "./Components/AddTodo";
import Navbar from "./Components/Navbar";
import TodoList from "./Components/TodoList";
import axios from "axios";
import "./App.css";
const App = () => {
  const [todos, setTodos] = useState([]);
  const [t, setT] = useState({ edit: false });
  useEffect(() => {
    //Function to fetch todos from server
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.log(err.message));
  }, []);

  //Function to add Todo to state and backend server
  const addTodo = async (todo) => {
    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      todo
    );
    if (res.data) {
      setTodos([res.data, ...todos]);
      window.alert("Todo Added");
    } else {
      window.alert("Failed to add Todo");
    }
  };

  //Function to complete a Todo
  const completeTodo = (id) => {
    todos.forEach((todo) => {
      if (todo.id === id) {
        todo.completed = true;
      }
    });

    setTodos([...todos]);
  };

  //function to edit a Todo
  const editTodo = (todo) => {
   
      todos.forEach((t) => {
        if (t.id === todo.id) {
          t.title = todo.title;
        }
      });
    
    setT({ edit: false });
    setTodos([...todos]);
  };

  //Function to cancel Edit Mode
  const cancelEdit = () => {
    setT({ edit: false });
  };

  const transferTodoHelper = (todo) => {
    setT({
      ...todo,
      edit: true,
    });
  };

  //Function to delete Todo from state and backend server
  const deleteTodo = async (id) => {
    const res = await axios.delete(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );
    if (res.data) {
      setTodos(todos.filter((t) => t.id !== id));
      window.alert("Todo Removed!!");
    } else {
      window.alert("Error Removing Todo");
    }
  };

  return (
    <>
      <Navbar />

      <div className="row mt-5 mb-5">
        <div className="col-lg-6">
          <AddTodo data={{ addTodo, todos, editTodo, t, cancelEdit }} />
        </div>

        <div className="col-lg-6">
          <h4>Todos</h4>

          <TodoList
            data={{ todos, deleteTodo, completeTodo, transferTodoHelper }}
          />
        </div>
      </div>
    </>
  );
};

export default App;
