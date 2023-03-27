import React from 'react';
import { Form,Button } from 'react-bootstrap';


export default function AddTask({ newTask, setNewTask, addTask }) {
    return (
      <Form className="my-3 d-flex justify-content-between ">
        <Form.Group controlId="newTask">
          <Form.Control type="text" placeholder="Enter task" value={newTask} onChange={e => setNewTask(e.target.value)} />
        </Form.Group>
        <Button variant="btn btn-primary" type="button" onClick={addTask} disabled={!newTask}>Add Task</Button>
      </Form>
    );
  }
  

