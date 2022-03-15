import React from "react";
import {
  Button,
  Col,
  Form,
  Row,
} from "react-bootstrap";

const status = { 1: "Active", 2: "Inactive", 3: "Requested" };
const role = { 1: "Admin", 2: "Developer", 3: "Lead" };

const UserProfileForm = ({ userData, onInputChange, onUpdateClick }) => {
  return (
    <>
      <Form className="container-sm">
        <Form.Group as={Row} className="mb-3 justify-content-md-center">
          <Form.Label column sm={2}>
            UserName
          </Form.Label>
          <Col sm={6}>
            <Form.Control
              onChange={onInputChange}
              name="userName"
              value={userData.userName}
              type="text"
              placeholder="Enter Name"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3 justify-content-md-center">
          <Form.Label column sm={2}>
            Email
          </Form.Label>
          <Col sm={6}>
            <Form.Control
              onChange={onInputChange}
              name="email"
              value={userData.email}
              type="email"
              placeholder="Enter Email"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3 justify-content-md-center">
          <Form.Label column sm={2}>
            Status
          </Form.Label>
          <Col sm={6}>
            <Form.Control
              onChange={onInputChange}
              value={status[userData.status]}
              type="text"
              name="status"
              placeholder="Enter Status"
              disabled
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3 justify-content-md-center">
          <Form.Label column sm={2}>
            Role
          </Form.Label>
          <Col sm={6}>
            <Form.Control
              onChange={onInputChange}
              value={role[userData.role]}
              type="text"
              name="role"
              placeholder="Choose Role"
              disabled
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-4 justify-content-md-center">
          <Form.Label column sm={2}>
            Active From
          </Form.Label>
          <Col sm={6}>
            <Form.Control
              onChange={onInputChange}
              value={userData.activeFrom}
              type="text"
              placeholder="Enter Active From"
              name="activeFrom"
              disabled
            />
          </Col>
        </Form.Group>

        <Row className="mb-5 justify-content-md-center">
          <Col sm={8}>
            <Button
              variant="primary"
              onClick={onUpdateClick}
              type="submit"
              className="w-100"
            >
              Update
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default UserProfileForm;
