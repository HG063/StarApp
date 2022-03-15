import React from 'react';
import { Container } from 'react-bootstrap';
import LandingNavbar from '../components/LandingNavbar';

const About = () => {
    return (
        <>
            <LandingNavbar></LandingNavbar>
            <Container>
                <h2 className='d-flex mt-4 mb-4 justify-content-center'>About</h2>
                <h3 className="d-flex justify-content-center">  <img
                    alt="star"
                    src="/star.png"
                    width="35"
                    height="35"
                    className="d-flex justify-content-center"
                />{" "}
                    Star App - Shift & Transport Allowance Reporting App</h3>
                <br />
                <br />
                <br />
                <h5>Project Details:</h5>
                <p><p>The team members working in non-standard shift get a shift allowance. This is calculated based on the attendance information collated by team leads. Currently, the process of calculating and validating this information is manual and involves Excel and email.</p>
                <p>The objective is to build a web application that uses the attendance data exported from MS Dynamics as input and generates the shift allowance report. The application would also build in authorization flow for validation and approval of this report.
                    </p></p>
                <br />
                <h5>Scope:</h5>
                <p className='pb-5'>
                    <p>•	Implement role-based authentication in the app based on User entitlements</p>
                    <p>•	Provide user ability to view/export report</p>
                    <p>•	Create a data model based on the report requirements</p>
                    <p>•	Implement batch job to fetch time-tracking information from MS Dynamics and upload relevant tables</p>
                </p>
            </Container>
        </>
    )
}

export default About;