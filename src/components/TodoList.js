import axios from "axios";
import React, { useState, useEffect } from "react";
import { Tab, Nav, Container, Form, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import TodoItemButtons from "./TodoItemButtons";
import EditTodoForm from "./EditTodoForm";

const baseURL = "http://127.0.0.1:8000/api/tasks";

export default function TodoList({ tasks, setTasks, tabs }) {
  const [editTask, setEditTask] = useState(null);
  
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
    <div className="mb-3 mt-md-4">
      <Tab.Content className="justify-content-center">
        {tabs.map(({ title, filterfn }) => (
          <Tab.Pane eventKey={title}>
            <ul className="list-group">
              {tasks.filter(filterfn).map((task) => (
                <li
                  key={task.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {editTask === task.id ? (
                    <EditTodoForm
                      task={task}
                      updateTask={updateTask}
                      setEditTask={setEditTask}
                    />
                  ) : (
                    <>
                      {task.task_title}

                      <TodoItemButtons
                        toggleComplete={toggleComplete}
                        setEditTask={setEditTask}
                        deleteTask={deleteTask}
                        task={task}
                      />
                    </>
                  )}
                </li>
              ))}
            </ul>
          </Tab.Pane>
        ))}
      </Tab.Content>
    </div>
  );
}
