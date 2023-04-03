import React from 'react';
import { Tab, Nav, Container, Form, Row, Col, Button } from "react-bootstrap";
export default function EditTodoForm() 
{
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
    return ( <Form
        onSubmit={(e) => {
          e.preventDefault();
          updateTask(
            task.id,
            e.target.elements.updatedTitle.value
          );
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
      </Form> );
 }
 
