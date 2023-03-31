import axios from "axios";
import React, { useState, useEffect } from "react";
import { Tab, Nav, Container, Form, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const baseURL = "http://127.0.0.1:8000/api/tasks";

export default function TodoList({ tasks, setTasks }) {
  const [editTask, setEditTask] = useState(null);
  console.log("taskksksks",tasks)
  
  const toggleComplete = (id) => {
    const task = tasks.find((task) => task.id === id);
    axios
      .put(`${baseURL}/${id}`, {
        task_title: task.task_title,
        is_completed: !task.is_completed,
        created_at: task.created_at,
        updated_at: task.updated_at,
      })
      .then((response) => {
        setTasks(tasks.map((task) => (task.id === id ? response.data : task)));
       
      })
      .catch((error) => {
        console.error(error);
      });
      window.location.reload();
  };

  const updateTask = (id, updatedTitle) => {
    
    axios
      .put(`${baseURL}/${id}`, { task_title: updatedTitle })
      .then((response) => {
        setTasks(tasks.map((task) => (task.id === id ? response.data : task)));
        window.location.reload();
        setEditTask(null);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteTask = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmDelete) {
      axios
        .delete(`${baseURL}/${id}`)
        .then((response) => {
          setTasks(tasks.filter((task) => task.id !== id));
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };


  return (
    <ul className="list-group">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          {editTask === task.id ? (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                updateTask(task.id, e.target.elements.updatedTitle.value);
              }}
            >
              <Row>
                <Col>
                  <Form.Group controlId="updatedTitle">
                    <Form.Control
                      type="text"
                      placeholder="Enter updated task"
                      defaultValue={task.task_title}
                    />
                  </Form.Group>
                </Col>
                <Col className="d-flex align-items-center">
                  <Button variant="primary" type="submit">
                    Save
                  </Button>
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={() => setEditTask(null)}
                  >
                    Cancel
                  </Button>
                </Col>
              </Row>
            </Form>
          ) : (
            <>
              {task.task_title}

              <div>
                {!task.is_completed ? (
                  <Button
                    variant="primary"
                    type="button"
                    onClick={() => toggleComplete(task.id)}
                  >
                    Complete
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={() => toggleComplete(task.id)}
                  >
                    Undo
                  </Button>
                )}

                <Button
                  variant="warning"
                  type="button"
                  onClick={() => setEditTask(task.id)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  type="button"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </Button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
