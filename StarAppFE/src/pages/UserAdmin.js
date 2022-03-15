import React, { Component } from "react";
import Navigation from "../components/Navigation";
import {
  Alert,
  Container,
  Form,
  FormControl,
  InputGroup,
  Spinner,
  Table,
} from "react-bootstrap";
import { Button, ButtonToolbar } from "react-bootstrap";
import AddUserModal from "../modals/AddUserModal";
import EditUserModal from "../modals/EditUserModal";
import ReactPaginate from "react-paginate";
import swal from "sweetalert";

const limit = 10;
var userLocalInfo;

export class UserAdmin extends Component {
  constructor(props) {
    userLocalInfo = JSON.parse(localStorage.getItem("user"));
    super(props);
    this.state = {
      admin: [],
      addModalShow: false,
      editModalShow: false,
      pageCount: 0,
      isNoResult: false,
      filterRole: 0,
      filterStatus: 0,
      searchQuery: "",
      currentPage: 1,
    };
    this.onSearchClick = this.onSearchClick.bind(this);
    this.onRoleChange = this.onRoleChange.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
  }

  refreshList() {
    var apiLink = `${process.env.REACT_APP_API}employees?Page=${this.state.currentPage}&PageSize=${limit}`;
    if (this.state.searchQuery) apiLink += `&Name=${this.state.searchQuery}`;
    if (this.state.filterRole) apiLink += `&Role=${this.state.filterRole}`;
    if (this.state.filterStatus)
      apiLink += `&Status=${this.state.filterStatus}`;
    fetch(apiLink, {
      method: "GET",
      headers: { authorization: `Bearer ${userLocalInfo.token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.employees.length === 0) this.setState({ isNoResult: true });
        else this.setState({ isNoResult: false });
        this.setState({ admin: data.employees });
        this.setState({ pageCount: data.totalPages });
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  deleteUser(id) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, it will remove the user data from database!",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`${process.env.REACT_APP_API}Employees/${id}`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: `Bearer ${userLocalInfo.token}`,
          },
        }).then((result) => {
          if (result.status === 200) {
            this.refreshList();
            swal("User data deleted successfully", {
              icon: "success",
            });
          } else {
            swal("Error!", "Failed to delete server side error.", {
              icon: "error",
            });
          }
        });
      } else {
        swal("Delete operation is cancelled!");
      }
    });
  }

  changeState(id) {
    fetch(`${process.env.REACT_APP_API}Employees/${id}/status/1`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${userLocalInfo.token}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.refreshList();
          swal(result);
        },
        (error) => {
          swal({
            title: "Error!",
            text: "Failed to change state.",
            icon: "error",
            button: "OK",
          });
        }
      );
  }

  onRoleChange = (ev) => {
    this.setState(
      { filterRole: parseInt(ev.target.value), currentPage: 1 },
      () => this.refreshList()
    );
  };

  onStatusChange = (ev) => {
    this.setState(
      { filterStatus: parseInt(ev.target.value), currentPage: 1 },
      () => this.refreshList()
    );
  };

  onSearchClick(ev) {
    ev.preventDefault();

    this.setState({ searchQuery: ev.target.search.value, currentPage: 1 }, () =>
      this.refreshList()
    );
  }

  handlePageClick = async (event) =>
    this.setState({ currentPage: event.selected + 1 }, () =>
      this.refreshList()
    );
  addModalClose = () =>
    this.setState({ addModalShow: false }, () => this.refreshList());
  editModalClose = () =>
    this.setState({ editModalShow: false }, () => this.refreshList());

  render() {
    const { admin, userid, mail, name, role, activefrom, status } = this.state;
    return (
      <div className="pb-5">
        <Navigation />
        <Container>
          <div className="my-2 d-flex justify-content-end">
            <ButtonToolbar className="my-2 d-flex justify-content-between w-100">
              <div className="d-flex flex-row">
                <Form onSubmit={this.onSearchClick}>
                  <InputGroup>
                    <FormControl
                      type="text"
                      name="search"
                      placeholder="Search"
                    />
                    <Button type="submit">
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </Button>
                  </InputGroup>
                </Form>
                <Form onChange={this.onRoleChange} className="d-flex flex-row">
                  <Form.Label column className="px-2 ms-2">
                    Role
                  </Form.Label>
                  <Form.Select>
                    <option value={0}>All</option>
                    <option value={1}>Admin</option>
                    <option value={2}>Developer</option>
                    <option value={3}>Lead</option>
                  </Form.Select>
                </Form>
                <Form
                  onChange={this.onStatusChange}
                  className="d-flex flex-row"
                >
                  <Form.Label column className="px-2 ms-2">
                    Status
                  </Form.Label>
                  <Form.Select>
                    <option value={0}>All</option>
                    <option value={1}>Active</option>
                    <option value={2}>Inactive</option>
                    <option value={3}>Requested</option>
                  </Form.Select>
                </Form>
              </div>
              <Button
                variant="primary"
                onClick={() => {
                  this.setState({ addModalShow: true });
                }}
              >
                Add User
              </Button>

              <AddUserModal
                show={this.state.addModalShow}
                onHide={this.addModalClose}
              />
            </ButtonToolbar>
          </div>
          {!this.state.isNoResult && this.state.admin.length === 0 ? (
            <Container className="d-flex justify-content-center">
              <Spinner animation="border" variant="secondary" />
            </Container>
          ) : (
            <Table className="mt-2" striped bordered hover size="sm">
              <thead>
                <tr className="text-center">
                  <th>User Id</th>
                  <th>Name</th>
                  <th>Email Id</th>
                  <th>Active From</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Options</th>
                </tr>
              </thead>

              <tbody>
                {admin.map((admin) => (
                  <tr key={admin.id}>
                    <td>{admin.id}</td>
                    <td>{admin.userName}</td>
                    <td>{admin.email}</td>
                    <td>{admin.activeFrom}</td>
                    <td>
                      {parseInt(admin.role) === 1
                        ? "Admin"
                        : parseInt(admin.role) === 2
                        ? "Developer"
                        : parseInt(admin.role) === 3
                        ? "Lead"
                        : ""}
                    </td>
                    <td>
                      {parseInt(admin.status) === 1
                        ? "Active"
                        : parseInt(admin.status) === 2
                        ? "Inactive"
                        : parseInt(admin.status) === 3
                        ? "Requested"
                        : ""}
                    </td>
                    <td className="d-flex justify-content-center">
                      <ButtonToolbar>
                        <Button
                          onClick={() =>
                            this.changeState(admin.id, admin.status)
                          }
                          disabled={parseInt(admin.status) === 3 ? false : true}
                          variant="success"
                          size="sm"
                          className="mx-1"
                        >
                          Confirm
                        </Button>

                        <Button
                          disabled={userLocalInfo.id === admin.id}
                          size="sm"
                          className="mx-1"
                          variant="secondary"
                          onClick={() =>
                            this.setState({
                              editModalShow: true,
                              userid: admin.id,
                              mail: admin.email,
                              name: admin.userName,
                              role: admin.role,
                              activefrom: admin.activeFrom,
                              status: admin.status,
                            })
                          }
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </Button>

                        <Button
                          disabled={userLocalInfo.id === admin.id}
                          size="sm"
                          className="mx-1"
                          variant="danger"
                          onClick={() => this.deleteUser(admin.id)}
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </Button>
                      </ButtonToolbar>
                    </td>
                  </tr>
                ))}
              </tbody>
              <EditUserModal
                show={this.state.editModalShow}
                onHide={this.editModalClose}
                userid={userid}
                mail={mail}
                name={name}
                role={role}
                activefrom={activefrom}
                status={status}
              />
            </Table>
          )}

          {this.state.isNoResult && (
            <Alert variant="danger">No results found!</Alert>
          )}

          {this.state.admin.length > 0 && (
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
