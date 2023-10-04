// src/TaskList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Styles/Tasklist.css'

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState('');

  useEffect(() => {
    // Fetch tasks from the JSON server
    axios.get('http://localhost:3001/tasks').then((response) => {
      setTasks(response.data);
    });
  }, []);

  // Add a new task
  const addTask = () => {
    if (task.trim() !== '') {
      if (editTaskId === null) {
        axios.post('http://localhost:3001/tasks', { title: task }).then(() => {
          setTask('');
          // Fetch updated tasks from the server
          axios.get('http://localhost:3001/tasks').then((response) => {
            setTasks(response.data);
          });
        });
      } else {
        // Edit an existing task
        axios
          .put(`http://localhost:3001/tasks/${editTaskId}`, { title: editedTask })
          .then(() => {
            setEditTaskId(null);
            setEditedTask('');
            // Fetch updated tasks from the server
            axios.get('http://localhost:3001/tasks').then((response) => {
              setTasks(response.data);
            });
          });
      }
    }
  };

  // Delete a task
  const deleteTask = (id) => {
    axios.delete(`http://localhost:3001/tasks/${id}`).then(() => {
      // Fetch updated tasks from the server
      axios.get('http://localhost:3001/tasks').then((response) => {
        setTasks(response.data);
      });
    });
  };

  // Start editing a task
  const editTask = (id, title) => {
    setEditTaskId(id);
    setEditedTask(title);
  };

  // Cancel editing a task
  const cancelEdit = () => {
    setEditTaskId(null);
    setEditedTask('');
  };

  return (
    <div className="task-list">
      <div className="task-form">
        <input
          type="text"
          placeholder="Enter a task"
          value={editTaskId !== null ? editedTask : task}
          onChange={(e) => (editTaskId !== null ? setEditedTask(e.target.value) : setTask(e.target.value))}
        />
        <button onClick={addTask}>{editTaskId !== null ? 'Save' : 'Add'}</button>
        {editTaskId !== null && <button onClick={cancelEdit}>Cancel</button>}
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Task</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{editTaskId === task.id ? <input type="text" value={editedTask} onChange={(e) => setEditedTask(e.target.value)} /> : task.title}</td>
              <td>
                {editTaskId === task.id ? (
                  <>
                    <button onClick={() => addTask()}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => editTask(task.id, task.title)}>Edit</button>
                    <button onClick={() => deleteTask(task.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;
