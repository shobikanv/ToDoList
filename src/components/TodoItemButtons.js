import React from "react";
import {Button} from 'react-bootstrap'

export default function TodoItemButtons({toggleComplete, setEditTask,deleteTask, task}) {
  return (
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
  );
}
