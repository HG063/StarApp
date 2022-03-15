import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import swal from "sweetalert";

const userLocalInfo = JSON.parse(localStorage.getItem("user"));
export default class AddUserModal extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    // console.log()
    fetch(`${process.env.REACT_APP_API}employees`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${userLocalInfo.token}`,
      },
      body: JSON.stringify({
        email: event.target.email.value,
        userName: event.target.userName.value,
        role: parseInt(event.target.role.value),
      }),
    })
      .then((result) => {
        if (result.status === 400) {
          swal("Error!", "This User Name is already taken!", "error");
        } else {
          swal("Added!", "User is added successfully!", "success");
        }
        //console.log(result);
        //window.location.reload();
      })
      .catch((error) => {
        //alert("server side error.");
        swal({
          title: "Error!",
          text: "server side error.",
          icon: "error",
          button: "OK",
        });
      });
  }

  render() {
    return (
      <Modal
        {...this.props}
        size="sm-6"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closebutton="true">
          <Modal.Title className="mb-1" id="contained-modal-title-vcenter">
            Add User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={8}>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email Id</Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    required
                    placeholder="Enter Email Id"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="userName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="userName"
                    required
                    placeholder="Enter Name"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="role">
                  <Form.Label>Role</Form.Label>
                  <Form.Select aria-label="Default select example">
                    <option defaultValue="Choose Role">Choose Role</option>
                    <option value={1}>Admin</option>
                    <option value={2}>Developer</option>
                    <option value={3}>Lead</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Button variant="primary" type="submit">
                    Add
                  </Button>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={this.props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
