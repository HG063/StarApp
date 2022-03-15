import React from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Navigation from '../components/Navigation';
import swal from 'sweetalert';

var excel, excelCheck = null;
const userLocalInfo = JSON.parse(localStorage.getItem("user"));
const Upload = () => {

    const handleFile = (e) => {
        if (e.target.files && e.target.files[0]) {
            excel = e.target.files[0];
            excelCheck = e.target.files;
        }
    }

    const handleUpload = (e) => {
        e.preventDefault();
        if (excelCheck && excel) {
            const formData = new FormData();
            formData.append("files", excel);
            fetch(`${process.env.REACT_APP_API}Allowance/Upload`, {
                method: 'POST',
                headers: {
                    authorization: `Bearer ${userLocalInfo.token}`
                },
                body: formData
            })
                .then(
                    (result) => {
                        swal("Uploaded!", "Excel Data is uploaded successfully!", "success");
                        // setTimeout(function () {
                        //     window.location.reload();
                        // }, 1500);
                    },
                    (error) => {
                        swal("Error!", "Error in uploading data!", "error");
                    }
                );
        }
    }

    return (
        <>
            <Navigation />
            <h5 className='d-flex justify-content-center mb-3 mt-4'>Upload Excel Data</h5>
            <Form>
                <div className='container d-flex justify-content-center'>
                    <Row>
                        <Col sm={10}>
                            <Form.Group controlId="formFile" >
                                <Form.Control type="file" name="file" onChange={handleFile} />
                            </Form.Group>
                        </Col>
                        <Col sm={1}>
                            <Button type="submit" onClick={handleUpload}>Upload</Button>
                        </Col>
                    </Row>
                </div>
            </Form>
        </>
    )
}

export default Upload;