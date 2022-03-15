import React, { Component } from "react";
import {
  Button,
  Table,
  Form,
  Container,
  Spinner,
  InputGroup,
  FormControl,
  Alert,
} from "react-bootstrap";
import EditAllowanceDashboardModal from "../modals/EditAllowanceDashboardModal";
import Navigation from "../components/Navigation";
import ReactPaginate from "react-paginate";
import swal from "sweetalert";
import EditCompensationModal from "../modals/EditCompensationModal";

const limit = 10;
var userLocalInfo;
export class AllowanceDashboard extends Component {
  constructor(props) {
    userLocalInfo = JSON.parse(localStorage.getItem("user"));
    super(props);
    this.state = {
      dashboard: [],
      editModalShow: false,
      editCompensationShow: false,
      pageCount: 0,
      isNoResult: false,
      searchQuery: "",
      currentPage: 1,
      projectNames: [],
      selectedProject: "",
      selectedDate: [],
    };
    this.refreshList = this.refreshList.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
    this.getProjectNames = this.getProjectNames.bind(this);
    this.onProjectSelect = this.onProjectSelect.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
  }

  getProjectNames() {
    fetch(
      `${process.env.REACT_APP_API}Allowance/ProjectNames?name=${this.state.searchQuery}`,
      {
        method: "GET",
        headers: { authorization: `Bearer ${userLocalInfo.token}` },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({ projectNames: data });
      });
  }

  refreshList() {
    var apiLink = `${process.env.REACT_APP_API}Allowance?Page=${this.state.currentPage}&PageSize=${limit}`;
    if (this.state.searchQuery) apiLink += `&Name=${this.state.searchQuery}`;
    if (this.state.selectedProject)
      apiLink += `&Project=${this.state.selectedProject}`;
    if (this.state.selectedDate.length > 0) {
      var date = this.state.selectedDate;
      apiLink += `&Month=${date[0]}&Year=${date[1]}`;
    }
    this.getProjectNames();
    fetch(apiLink, {
      method: "GET",
      headers: { authorization: `Bearer ${userLocalInfo.token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.allowances.length === 0) this.setState({ isNoResult: true });
        else this.setState({ isNoResult: false });
        this.setState({ dashboard: data.allowances });
        this.setState({ pageCount: data.totalPages });
      });
  }

  onSearchClick(ev) {
    ev.preventDefault();
    this.setState({ searchQuery: ev.target.search.value, currentPage: 1 }, () =>
      this.refreshList()
    );
  }

  onDateChange(ev) {
    this.setState(
      {
        selectedDate: [
          ev.target.value.split("-")[1],
          ev.target.value.split("-")[0],
        ],
      },
      () => this.refreshList()
    );
  }

  componentDidMount() {
    this.refreshList();
  }

  onProjectSelect(ev) {
    this.setState({ selectedProject: ev.target.value, currentPage: 1 }, () =>
      this.refreshList()
    );
  }

  editModalClose = () =>
    this.setState({ editModalShow: false }, () => this.refreshList());

  editCompensationClose = () =>
    this.setState({ editCompensationShow: false }, () => this.refreshList());

  handlePageClick = async (data) => {
    console.log(data.selected);
    this.setState({ currentPage: data.selected + 1 }, () => this.refreshList());
  };

  render() {
    const {
      dashboard,
      dashboardid,
      sapid,
      name,
      project,
      afternoonshift,
      nightshift,
      dayseligibleforta,
    } = this.state;

    return (
      <div className="pb-5">
        <Navigation UserName={userLocalInfo.userName} />
        <Container>
          <div className="my-2  d-flex flex-row  justify-content-between text-nowrap">
            <div className="w-10 d-flex flex-row gap-1">
              <Form onSubmit={this.onSearchClick}>
                <InputGroup>
                  <FormControl type="text" name="search" placeholder="Search" />
                  <Button type="submit">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </Button>
                </InputGroup>
              </Form>

              <Form onChange={this.onProjectSelect} className="d-flex flex-row">
                <Form.Label column className="px-2 ms-0">
                  Project
                </Form.Label>
                <Form.Select>
                  <option value="">All</option>
                  {this.state.projectNames.map((project) => (
                    <option key={project}>{`${project}`}</option>
                  ))}
                </Form.Select>
              </Form>
              <Form.Label column className=" px-2 ms-0">
                Month
              </Form.Label>
              <Form onChange={this.onDateChange}>
                <Form.Control type="month"></Form.Control>
              </Form>
            </div>

            <Button
              variant="secondary"
              onClick={() =>
                this.setState({
                  editCompensationShow: true,
                })
              }
            >
              Edit Compensation
            </Button>

            <Button
              onClick={() => {
                window.open(
                  `${process.env.REACT_APP_API}Allowance/Download`,
                  "_blank"
                );
                swal("Downloaded!", "Your file downloaded successfully.", {
                  icon: "success",
                });
              }}
              variant="success"
            >
              Approve & Download
            </Button>
          </div>
          {!this.state.isNoResult && this.state.dashboard.length === 0 ? (
            <Container className="d-flex justify-content-center">
              <Spinner animation="border" variant="secondary" />
            </Container>
          ) : (
            <Table
              className="mt-3 text-center"
              responsive="sm"
              striped
              bordered
              hover
              size="sm"
            >
              <thead>
                <tr>
                  <th>Sap Id</th>
                  <th>Project</th>
                  <th>Name</th>
                  <th>Period Start</th>
                  <th>Period End</th>
                  <th>Project Hour</th>
                  <th>Holiday / Leave Hours</th>
                  <th>Afternoon Shift Days</th>
                  <th>Night Shift Days</th>
                  <th>Days Eligible for TA</th>
                  <th>Transport Allowance</th>
                  <th>Total Allowance</th>
                  <th>Modify</th>
                </tr>
              </thead>
              <tbody>
                {dashboard.map((dashboard) => (
                  <tr key={dashboard.id}>
                    <td>{dashboard.sapId}</td>
                    <td>{dashboard.project}</td>
                    <td>{dashboard.name}</td>
                    <td>{dashboard.periodStart}</td>
                    <td>{dashboard.periodEnd}</td>
                    <td>{dashboard.projectHours}</td>
                    <td>{dashboard.holidayHours}</td>
                    <td>{dashboard.afternoonShiftDays}</td>
                    <td>{dashboard.nightShiftDays}</td>
                    <td>{dashboard.daysEligibleForTA}</td>
                    <td>{dashboard.transportAllowance}</td>
                    <td>{dashboard.totalAllowance}</td>
                    <td>
                      <Button
                        size="sm"
                        className="mx-1"
                        variant="secondary"
                        onClick={() =>
                          this.setState({
                            editModalShow: true,
                            dashboardid: dashboard.id,
                            sapid: dashboard.sapId,
                            name: dashboard.name,
                            project: dashboard.project,
                            afternoonshift: dashboard.afternoonShiftDays,
                            nightshift: dashboard.nightShiftDays,
                            dayseligibleforta: dashboard.daysEligibleForTA,
                          })
                        }
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

          {this.state.isNoResult && (
            <Alert variant="danger">No results found!</Alert>
          )}

          <EditAllowanceDashboardModal
            show={this.state.editModalShow}
            onHide={this.editModalClose}
            dashboardid={dashboardid}
            sapid={sapid}
            name={name}
            project={project}
            afternoonshift={afternoonshift}
            nightshift={nightshift}
            dayseligibleforta={dayseligibleforta}
          />

          <EditCompensationModal
            show={this.state.editCompensationShow}
            onHide={this.editCompensationClose}
            projects={this.state.projectNames}
          />

          {this.state.dashboard.length > 0 && (
            <ReactPaginate
              previousLabel={"previous"}
              nextLabel={"next"}
              breakLabel={"..."}
              pageCount={this.state.pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={this.handlePageClick}
              containerClassName={"pagination justify-content-center pb-5 pt-3"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              activeClassName={"active"}
            />
          )}
        </Container>
      </div>
    );
  }
}
