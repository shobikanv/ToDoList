import "./App.css";
import axios from "axios";
import AddTask from "./components/AddTask";
import React, { useState, useEffect } from "react";
import { Tab, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import TodoList from "./components/TodoList";

const baseURL = "http://127.0.0.1:8000/api/tasks";

function TodoTasksPane(props) {
  const { title, tasks, setTasks } = props;

  return (
    <Tab.Pane eventKey={title}>
      <TodoList tasks={tasks} setTasks={setTasks} />
    </Tab.Pane>
  );
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    axios
      .get(`${baseURL}`)
      .then((response) => {
        setTasks(response.data.tasks);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  
  const handleToggleTask = (taskId) => {
  };

  const tabs = [
    { title: "incomplete", filterfn: (task) => !task.is_completed },
    { title: "completed", filterfn: (task) => task.is_completed },
  ];

  return (
    <div className="container my-3 mx-auto">
      <h2>Todo App</h2>
      <div className="d-flex justify-content-center">
        <AddTask
          newTask={newTask}
          setNewTask={setNewTask}
          tasks={tasks}
          setTasks={setTasks}
        />
      </div>

      <Container>
        <Tab.Container defaultActiveKey="incomplete">
          <Nav variant="tabs" className="justify-content-center">
            {tabs.map(({ title }) => (
              <Nav.Item key={title}>
                <Nav.Link eventKey={title}>{title}</Nav.Link>
              </Nav.Item>
            ))}
          </Nav>

          <div className="mb-3 mt-md-4">
            <Tab.Content className="justify-content-center">
              {tabs.map(({ title, filterfn }) => (
                <TodoTasksPane
                  key={title}
                  title={title}
                  tasks={tasks.filter(filterfn)}
                  setTasks={setTasks}
                />
              ))}
            </Tab.Content>
          </div>
        </Tab.Container>
      </Container>
    </div>
  );
}

export default App;
