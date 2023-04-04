import axios from "axios";
import { Form, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const baseURL = "http://127.0.0.1:8000/api/tasks";

export default function EditTodoForm({task,updateTask,setEditTask}) 
{

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
 
