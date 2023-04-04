import React from 'react';
import {Nav} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function TodoTabs({tabs}) {
    return (
      <Nav variant="tabs" className="justify-content-center">
        {tabs.map(({ title }) => (
          <Nav.Item key={title}>
            <Nav.Link eventKey={title}>{title}</Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    );
  }
  