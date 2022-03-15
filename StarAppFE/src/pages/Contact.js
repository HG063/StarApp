import React from 'react';
import { Container } from 'react-bootstrap';
import LandingNavbar from '../components/LandingNavbar';

const Contact = () => {
    return (
        <>
            <LandingNavbar></LandingNavbar>
            <Container>
                <h2 className='d-flex mt-4 mb-4 justify-content-center'>Contact</h2>
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
                <h5>Mentors:</h5>
                <p>Nayan J Kar      - nayan.kar@incedoinc.com</p>
                <p>Saurabh Aggarwal - saurabh.aggarwal@incedoinc.com</p>
                <br />
                <h5>Team Members:</h5>
                <p>Harshit Gupta - harshit.gupta2@incedoinc.com</p>
                <p>Saksham Verma - saksham.verma1@incedoinc.com</p>
                <p>Mohit Khatri  - mohit.khatri1@incedoinc.com</p>
                <p>Ravindu Garg  - ravindu.garg@incedoinc.com</p>
                <p className='pb-5'>Mahak         - mahak1@incedoinc.com</p>
            </Container>
        </>
    )
}

export default Contact;