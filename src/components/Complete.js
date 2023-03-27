import {  Form, Button, Row, Col } from 'react-bootstrap';

export default function Complete({tasks,editTask,deleteTask,setEditTask,toggleComplete,updateTask}) {
    return (
        <ul className="list-group">
             {tasks
               .filter((task) => task.is_completed)
               .map((task) => (
                 <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
                   {editTask === task.id ? (
                     <Form onSubmit={(e) => {
                       e.preventDefault();
                       updateTask(task.id, e.target.elements.updatedTitle.value);
                     }}>
                       <Row>
                         <Col>
                           <Form.Group controlId="updatedTitle">
                             <Form.Control type="text" placeholder="Enter updated task" defaultValue={task.task_title} />
                           </Form.Group>
                         </Col>
                         <Col className="d-flex align-items-center">
                           <Button variant="primary" type="submit">Save</Button>
                           <Button variant="secondary" type="button" onClick={() => setEditTask(null)}>Cancel</Button>
                         </Col>
                       </Row>
                     </Form>
                   ) : (
                     <>
                       {task.task_title}
                       <div>
                         <Button variant="secondary" type="button" onClick={() => toggleComplete(task.id)}>Undo</Button>
                         <Button variant="warning" type="button" onClick={() => setEditTask(task.id)}>Edit</Button>
                         <Button variant="danger" type="button" onClick={() => deleteTask(task.id)}>Delete</Button>
                       </div>
                     </>
                   )}
                 </li>
               ))}


           </ul>
    )

} 