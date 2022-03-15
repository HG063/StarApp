import React from "react";
import Nav from "react-bootstrap/Nav";
import { Button } from "react-bootstrap";


const NavBar = () => {
  return (
    <Nav className="d-flex justify-content-end">
      <Nav.Item>
        <Button variant="danger">Logout</Button>
      </Nav.Item>
    </Nav>
  );
};

export default NavBar;
