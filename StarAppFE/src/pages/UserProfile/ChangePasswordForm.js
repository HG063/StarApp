import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const ChangePasswordForm = ({
  onPasswordInputChange,
  passwordData,
  onChangePasswordClick,
}) => {
  return (
    <>
      <Form>
        <Form.Group as={Row} className="mb-3 justify-content-md-center">
          <Form.Label column sm={2}>
            Old Password
          </Form.Label>
          <Col sm={6}>
            <Form.Control
              onChange={onPasswordInputChange}
              name="oldPassword"
              value={passwordData.oldPassword}
              type="password"
              placeholder="Old Password"

            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3 justify-content-md-center">
          <Form.Label column sm={2}>
            New Password
          </Form.Label>
          <Col sm={6}>
            <Form.Control
              onChange={onPasswordInputChange}
              name="newPassword"
              value={passwordData.newPassword}
              type="password"
              placeholder="New Password"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3 justify-content-md-center">
          <Form.Label column sm={2}>
            Confirm New Password
          </Form.Label>
          <Col sm={6}>
            <Form.Control
              onChange={onPasswordInputChange}
              name="confirmNewPassword"
              value={passwordData.confirmNewPassword}
              type="password"
              placeholder="Confirm New Password"
            />
          </Col>
        </Form.Group>

        <Row className="mt-6 justify-content-md-center">
          <Col sm={8}>
            <Button
              variant="primary"
              onClick={onChangePasswordClick}
              type="submit"
              className="w-100"
            >
              Change Password
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default ChangePasswordForm;
