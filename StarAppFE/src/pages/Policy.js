import React from 'react';
import { Container } from 'react-bootstrap';
import LandingNavbar from '../components/LandingNavbar';

const Policy = () => {
    return (
        <>
            <LandingNavbar></LandingNavbar>
            <Container>
                <h2 className='d-flex mt-4 mb-4 justify-content-center'>Policy</h2>
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
                <h5>Copyright 2022 - 2023 INCEDO INC.</h5>
                <p>All Rights Reserved. No part of this document may be reproduced, stored in a retrieval system, distributed or transmitted, in any form, or by any means, electronic or otherwise, including photocopying, reprinting, or recording, for any purpose, without the express prior written permission of Incedo Inc. </p>
                <br />
                <h5>REQUESTS</h5>    
                <p>For information requests or for obtaining permission for the use of this work, please submit a written request to: Marketing and Communications, Incedo Inc, Plot No. 248 Udyog Vihar, Phase IV, Gurgaon - 122015. Email: communications@incedoinc.com</p>
                
            </Container>
        </>
    )
}

export default Policy;