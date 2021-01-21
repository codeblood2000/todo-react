import React, { useEffect, useState } from 'react';

import './App.css';
import Form from "./components/Form";
import TodoList from "./components/TodoList"

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    getFromLocalStorage();
  },[]);

  useEffect(() => {
    filterHandler();
    saveLocalStorage();
  }, [todos, status])

  const filterHandler = (e) => {
    switch (status) {
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  }

  const saveLocalStorage = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  const getFromLocalStorage = () => {
    if(localStorage.getItem('todos') === null){
      localStorage.setItem('todos', JSON.stringify([]));
    }else{
      let todosLocal = JSON.parse(localStorage.getItem('todos'));
      setTodos(todosLocal);
    }
  }

  return (
    <div className="App">
      <header>
        <h1>TODO List</h1>
      </header>
      <Form inputText={inputText} setStatus={setStatus} todos={todos} setTodos={setTodos} setInputText={setInputText} />
      <TodoList status={status} setTodos={setTodos} todos={filteredTodos} />
    </div>
  );
}

export default App;
