
import './App.css';
import axios from 'axios';
import AddTask from './components/AddTask';
import Incomplete from'./components/Incomplete';
import Complete from './components/Complete';
import React, { useState, useEffect } from 'react';
import { Tab, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const baseURL="http://127.0.0.1:8000/api/tasks"
function App() {
 const [tasks, setTasks] = useState([]);
 const [newTask, setNewTask] = useState('');
 const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    axios.get(`${baseURL}`)
      .then(response => {
        setTasks(response.data.tasks);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  
  const addTask = () => {
    axios.post(`${baseURL}`, { task_title: newTask })
      .then(response => {
        setTasks([...tasks, response.data]);
        setNewTask('');
      })
      .catch(error => {
        console.error(error);
      });
  };
  const toggleComplete = (id) => {
    const task = tasks.find(task => task.id === id);
    axios.put(`${baseURL}/${id}`, {
      task_title: task.task_title,
      is_completed: !task.is_completed,
      created_at: task.created_at,
      updated_at: task.updated_at,
    })
      .then(response => {
        setTasks(tasks.map(task => task.id === id ? response.data : task));
      })
      .catch(error => {
        console.error(error);
      });
  };
 
 
  const updateTask = (id, updatedTitle) => {
    axios.put(`${baseURL}/${id}`, { task_title: updatedTitle })
      .then(response => {
        setTasks(tasks.map(task => task.id === id ? response.data : task));
        setEditTask(null);
      })
      .catch(error => {
        console.error(error);
      });
  };
 
  const deleteTask = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete){
    axios.delete(`${baseURL}/${id}`)
      .then(response => {
        setTasks(tasks.filter(task => task.id !== id));
      })
      .catch(error => {
        console.error(error);
      });
    }
  };
 
 
  return (
    <div className="container my-3 mx-auto">
    <h2>Todo App</h2>
    <div className="d-flex justify-content-center">
      <AddTask newTask={newTask} setNewTask={setNewTask} addTask={addTask}/>
      
    </div>
 
    <Container>
      
    <Tab.Container defaultActiveKey="incomplete">
       <Nav variant="tabs" className="justify-content-center">
         <Nav.Item >
           <Nav.Link eventKey="incomplete">Incomplete</Nav.Link>
         </Nav.Item>
         <Nav.Item>
           <Nav.Link eventKey="completed">Completed</Nav.Link>
         </Nav.Item>
       </Nav>
       

       <div className="mb-3 mt-md-4">
       <Tab.Content className="justify-content-center">
         <Tab.Pane eventKey="incomplete">
          <Incomplete tasks={tasks} editTask={editTask} deleteTask={deleteTask}  setEditTask={setEditTask} toggleComplete={toggleComplete} updateTask={updateTask}  />
         </Tab.Pane>
         <Tab.Pane eventKey="completed">
          <Complete tasks={tasks} editTask={editTask} deleteTask={deleteTask}  setEditTask={setEditTask} toggleComplete={toggleComplete} updateTask={updateTask}  />
         </Tab.Pane>
       </Tab.Content>

     </div>
     </Tab.Container>
     
     </Container>
    </div>

  );
}

export default App;
