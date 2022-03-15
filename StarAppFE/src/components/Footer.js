import React from 'react';

const Footer = () => {
  return (
    <div className='mt-5'>
      <footer className="bg-light text-center text-white">
        {/* <!-- Grid container --> */}
        <div className="container p-4 pb-0">
          {/* <!-- Section: Social media --> */}
          <section className="mb-4">
            {/* <!-- Facebook --> */}
            <a
              className="btn btn-primary btn-floating m-1 rounded-circle"
              style={{ "backgroundColor": "#3b5998" }}
              href="https://www.facebook.com/"
              role="button"
            ><i className="fab fa-facebook"></i></a>

            {/* <!-- Twitter --> */}
            <a
              className="btn btn-primary btn-floating m-1 rounded-circle"
              style={{ "backgroundColor": "#55acee" }}
              href="https://twitter.com/"
              role="button"
            ><i className="fab fa-twitter"></i></a>

            {/* <!-- Google --> */}
            <a
              className="btn btn-primary btn-floating m-1 rounded-circle"
              style={{ "backgroundColor": "#FF1744" }}
              href="https://www.google.co.in/"
              role="button"
            ><i className="fab fa-google"></i></a>

            {/* <!-- Instagram --> */}
            <a
              className="btn btn-primary btn-floating m-1 rounded-circle"
              style={{ "backgroundColor": "#EF6C00" }}
              href="https://www.instagram.com/"
              role="button"
            ><i className="fab fa-instagram"></i></a>

            {/* <!-- Linkedin --> */}
            <a
              className="btn btn-primary btn-floating m-1 rounded-circle"
              style={{ "backgroundColor": "#0082ca" }}
              href="https://www.linkedin.com/"
              role="button"
            ><i className="fab fa-linkedin-in"></i></a>
            {/* <!-- Github --> */}
            <a
              className="btn btn-primary btn-floating m-1 rounded-circle"
              style={{ "backgroundColor": "#333333" }}
              href="https://github.com/"
              role="button"
            ><i className="fab fa-github"></i></a>
          </section>
          {/* <!-- Section: Social media --> */}
        </div>
        {/* <!-- Grid container --> */}

        {/* <!-- Copyright --> */}
        
        <div className="text-center p-3" style={{ "backgroundColor": "rgba(0, 0, 0, 0.2)" }}>
          © 2022 Copyright:
          <a className="ms-1 text-white" href="/">StarApp.com</a>
        </div>
        {/* <!-- Copyright --> */}
      </footer>
    </div>
  )
}

export default Footer;