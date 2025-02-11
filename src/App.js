import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');


  useEffect(() => {
    axios.get('http://localhost:3306/todo')
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => {
        console.error( err);
      });
  }, []);


  const addTodo = () => {
  
    axios.post('http://localhost:3306/createtodo', { text })
      .then((res) => {
        setTodos([...todos, { Personid: res.data.id, firstname: text }]);
        setText('');
      })
      .catch((err) => {
        console.error( err);
      });
  };

  // Delete a todo
  const deleteTodo = (id) => {
    axios.delete(`http://localhost:3306/todo/${id}`)
      .then(() => {
        setTodos(todos.filter((todo) => todo.Personid !== id));
      })
      .catch((err) => {
        console.error("Failed to delete todo:", err);
      });
  };

  return (
    <>
      <h1>To Do</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a new todo"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((data) => (
          <li key={data.Personid}>
            {data.firstname}
            <button onClick={() => deleteTodo(data.Personid)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;