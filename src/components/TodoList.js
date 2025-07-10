import React, { useEffect, useState } from 'react';
import API from '../api';
import TodoForm from './TodoForm';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);

  const fetchTodos = async () => {
    const res = await API.get('/todos');
    setTodos(res.data);
  };

  const handleDelete = async (id) => {
    await API.delete(`/todos/${id}`);
    fetchTodos();
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h2>Your Todos</h2>
      <TodoForm refresh={fetchTodos} editingTodo={editingTodo} clearEdit={() => setEditingTodo(null)} />
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <p>Due: {new Date(todo.dueDate).toLocaleDateString()}</p>
            <button onClick={() => handleEdit(todo)}>Edit</button>
            <button onClick={() => handleDelete(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
