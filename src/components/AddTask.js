import React from 'react';
import { Form,Button } from 'react-bootstrap';

import  { useState} from "react";
import axios from 'axios';

const baseURL="http://127.0.0.1:8000/api/tasks"

export default function AddTask({ tasks ,setTasks }) {

  const [newTask, setNewTask] = useState("");
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
    return (
      <Form className="my-3 d-flex justify-content-between ">
        <Form.Group controlId="newTask">
          <Form.Control type="text" placeholder="Enter task" value={newTask} onChange={e => setNewTask(e.target.value)} />
        </Form.Group>
        <Button variant="btn btn-primary" type="button" onClick={addTask} disabled={!newTask}>Add Task</Button>
      </Form>
    );
  }
  

