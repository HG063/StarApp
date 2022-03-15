import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import swal from "sweetalert";

var userLocalInfo;
export default class EditAllowanceDashboardModal extends Component {
  constructor(props) {
    userLocalInfo = JSON.parse(localStorage.getItem("user"));
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_API}Allowance/` + this.props.dashboardid, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${userLocalInfo.token}`,
      },
      body: JSON.stringify({
        id: this.props.dashboardid,
        sapId: event.target.sapid.value,
        name: event.target.name.value,
        project: event.target.project.value,
        afternoonShiftDays: event.target.afternoonshift.value,
        nightShiftDays: event.target.nightshift.value,
        daysEligibleForTA: event.target.dayseligibleforta.value,
      }),
    })
      .then(
        (result) => {
          // console.log(result);
          if (result.status === 200)
            swal("Updated!", "Data is updated successfully!", "success");
          else if(result.status === 400)
          {
            // console.log(result);
            swal("Error!", "Please recheck the data and try again!", "error");
          }
          else
          {
            
          }
        }
      );
  }

  render() {
    return (
      <div className="container">
        <Modal
          scrollable={true}
          {...this.props}
          size="sm-6"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closebutton="true">
            <Modal.Title className="mb-1" id="contained-modal-title-vcenter">
              Edit Allowance Dashboard
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row>
              <Col sm={8}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group className="mb-3" controlId="sapid">
                    <Form.Label>Sap Id</Form.Label>
                    <Form.Control
                      type="text"
                      name="sapid"
                      required
                      disabled
                      defaultValue={this.props.sapid}
                      placeholder="Enter Sap Id"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="project">
                    <Form.Label>Project</Form.Label>
                    <Form.Control
                      type="text"
                      name="project"
                      required
                      disabled
                      defaultValue={this.props.project}
                      placeholder="Enter Project"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      required
                      disabled
                      defaultValue={this.props.name}
                      placeholder="Enter Name"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="afternoonshift">
                    <Form.Label>Afternoon Shift Days</Form.Label>
                    <Form.Control
                      type="text"
                      name="afternoonshift"
                      required
                      defaultValue={this.props.afternoonshift}
                      placeholder="Enter Afternoon Shift Days"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="nightshift">
                    <Form.Label>NightShift Days</Form.Label>
                    <Form.Control
                      type="text"
                      name="nightshift"
                      required
                      defaultValue={this.props.nightshift}
                      placeholder="Enter Night Shift Days"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="dayseligibleforta">
                    <Form.Label>Days Eligible for TA</Form.Label>
                    <Form.Control
                      type="text"
                      name="dayseligibleforta"
                      required
                      defaultValue={this.props.dayseligibleforta}
                      placeholder="Enter Days Eligible For TA"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Button variant="primary" type="submit">
                      Update
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
      </div>
    );
  }
}
