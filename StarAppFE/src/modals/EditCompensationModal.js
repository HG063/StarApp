import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import swal from "sweetalert";

var userLocalInfo;
export default class EditCompensationModal extends Component {
  constructor(props) {
    userLocalInfo = JSON.parse(localStorage.getItem("user"));
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      names: "",
      afternoonShiftCompensation: "",
      nightShiftCompensation: "",
      transportCompensation: "",
    };
    this.getProjectData = this.getProjectData.bind(this);
  }

  getProjectData(event) {
    this.setState({ names: event.target.value });
    if (!event.target.value) {
      this.setState({
        afternoonShiftCompensation: "",
        nightShiftCompensation: "",
        transportCompensation: "",
      });
    } else {
      fetch(
        `${process.env.REACT_APP_API}Allowance/Compensation?project=${event.target.value}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: `Bearer ${userLocalInfo.token}`,
          },
        }
      )
        .then((res) => res.json())
        .then((result) => {
          this.setState({
            afternoonShiftCompensation: result.afternoonShiftCompensation,
            nightShiftCompensation: result.nightShiftCompensation,
            transportCompensation: result.transportCompensation,
          });
        })
        .catch((error) => {
          swal("Error!", "Name Data Not Found!", "error");
        });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_API}Allowance/Compensation`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${userLocalInfo.token}`,
      },
      body: JSON.stringify({
        projectName: this.state.names,
        afternoonShiftCompensation:
          event.target.afternoonShiftCompensation.value,
        nightShiftCompensation: event.target.nightShiftCompensation.value,
        transportCompensation: event.target.transportCompensation.value,
      }),
    }).then((result) => {
      if (result.status === 200)
        swal("Updated!", "Data is updated successfully!", "success");
      else swal("Error!", "Error in updating record!", "error");
    });
  }

  render() {
    return (
      <div className="container">
        <Modal scrollable={true} {...this.props} size="sm-6" centered>
          <Modal.Header closebutton="true">
            <Modal.Title className="mb-1" id="contained-modal-title-vcenter">
              Edit Compensation
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row>
              <Col sm={8}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group className="mb-3" controlId="Project">
                    <Form.Label>Project</Form.Label>
                    <Form.Select onChange={this.getProjectData}>
                      <option value="">Select Project</option>
                      {this.props.projects &&
                        this.props.projects.map((project) => (
                          <option key={project}>{`${project}`}</option>
                        ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="afternoonShiftCompensation"
                  >
                    <Form.Label>AfterNoon Shift Compensation</Form.Label>
                    <Form.Control
                      type="text"
                      name="afternoonShiftCompensation"
                      required
                      value={this.state.afternoonShiftCompensation}
                      onChange={(e) =>
                        this.setState({
                          afternoonShiftCompensation: e.target.value,
                        })
                      }
                      placeholder="Enter AfterNoon Shift Compensation"
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="nightShiftCompensation"
                  >
                    <Form.Label>Night Shift Compensation</Form.Label>
                    <Form.Control
                      type="text"
                      name="nightShiftCompensation"
                      required
                      value={this.state.nightShiftCompensation}
                      onChange={(e) =>
                        this.setState({
                          nightShiftCompensation: e.target.value,
                        })
                      }
                      placeholder="Enter Night Shift Compensation"
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="transportCompensation"
                  >
                    <Form.Label>Transport Compensation</Form.Label>
                    <Form.Control
                      type="text"
                      name="transportCompensation"
                      required
                      value={this.state.transportCompensation}
                      onChange={(e) =>
                        this.setState({ transportCompensation: e.target.value })
                      }
                      placeholder="Enter Transport Compensation"
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
