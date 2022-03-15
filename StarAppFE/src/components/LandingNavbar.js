import React from "react";
import { Nav, Navbar } from "react-bootstrap";

const LandingNavbar = () => {
    return (
        <>
            <Navbar
                collapseOnSelect
                variant="light"
                expand="lg"
                className="mb-3 shadow"
            >
                <Navbar.Brand className="ms-5" href="/">
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
                    <div className="d-flex justify-content-end w-100">
                        <Nav className="ml-auto">
                            <Nav.Link
                                className=""
                                href="/About"
                            >
                                About
                            </Nav.Link>
                            <Nav.Link
                                className=""
                                href="/Contact"
                            >
                                Contact
                            </Nav.Link>
                            <Nav.Link
                                className="me-5"
                                href="/Policy"
                            >
                                Policy
                            </Nav.Link>
                        </Nav>
                    </div>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default LandingNavbar;