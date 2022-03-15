import React from "react";
import {
  Container,
  Dropdown,
  Nav,
  Navbar,
  NavItem,
  NavLink,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const roles = { 1: "Admin", 2: "Developer", 3: "Lead" };

const Navigation = () => {
  const userLocalInfo = JSON.parse(localStorage.getItem("user"));
  var navigate = useNavigate();
  var location = useLocation();

  const capitalizeFirstLetter = (name) =>
    name
      .trim()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const onLogoutClick = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <Navbar
      collapseOnSelect
      variant="light"
      expand="lg"
      className="mb-3 shadow"
    >
      <Container>
        <Navbar.Brand href="/home">
          <img
            alt="star"
            src="/star.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          {/* <i className="fa-solid fa-star">{" "}</i> */}
          Star App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <div className="d-flex justify-content-between w-100">
            <Nav className="mr-auto">
              {userLocalInfo.role === 1 && <Nav.Link
                className=""
                href="/useradmin"
                active={location.pathname === "/useradmin"}
              >
                User Admin
              </Nav.Link>}
              {userLocalInfo.role !== 2 && <Nav.Link
                className=""
                href="/allowancedashboard"
                active={location.pathname === "/allowancedashboard"}
              >
                Dashboard
              </Nav.Link>}
              {userLocalInfo.role === 2 && <Nav.Link
                className=""
                href="/Upload"
                active={location.pathname === "/upload"}
              >
                Upload
              </Nav.Link>}
            </Nav>
            <Nav className="ml-auto">
              <Dropdown as={NavItem} className="">
                <Dropdown.Toggle as={NavLink}>
                  <i className="fa-solid fa-user" id="viewuserprofile"></i>{" "}
                  {`${capitalizeFirstLetter(userLocalInfo.userName)} (${roles[userLocalInfo.role]
                    })`}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/UserProfile">
                    Edit Profile
                  </Dropdown.Item>
                  <Dropdown.Item onClick={onLogoutClick}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
