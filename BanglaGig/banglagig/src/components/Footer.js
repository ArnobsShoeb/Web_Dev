import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div>
      <footer className="text-center text-lg-start bg-body-tertiary text-muted">
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>

          <div>
            <Link to="/" className="me-4 text-reset">
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link to="/" className="me-4 text-reset">
              <i className="fab fa-twitter"></i>
            </Link>
            <Link to="/" className="me-4 text-reset">
              <i className="fab fa-google"></i>
            </Link>
            <Link to="/" className="me-4 text-reset">
              <i className="fab fa-instagram"></i>
            </Link>
            <Link to="/" className="me-4 text-reset">
              <i className="fab fa-linkedin"></i>
            </Link>
            <Link to="/" className="me-4 text-reset">
              <i className="fab fa-github"></i>
            </Link>
          </div>
        </section>

        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="fw-bold mb-4">
                  <i className="fas fa-gem me-3"></i>BanglaGig
                </h6>
                <p>
                Connecting talented freelancers with businesses worldwide. Delivering quality work, one project at a time. Join our community and elevate your career or find the perfect talent for your project
                </p>
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Products</h6>
                <p>
                  <Link href="#!" className="text-reset">
                    Angular
                  </Link>
                </p>
                <p>
                  <Link href="#!" className="text-reset">
                    React
                  </Link>
                </p>
                <p>
                  <Link href="#!" className="text-reset">
                    Vue
                  </Link>
                </p>
                <p>
                  <Link href="#!" className="text-reset">
                    Laravel
                  </Link>
                </p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                <p>
                  <Link href="#!" className="text-reset">
                    Pricing
                  </Link>
                </p>
                <p>
                  <Link href="#!" className="text-reset">
                    Settings
                  </Link>
                </p>
                <p>
                  <Link href="#!" className="text-reset">
                    Orders
                  </Link>
                </p>
                <p>
                  <Link href="#!" className="text-reset">
                    Help
                  </Link>
                </p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <i className="fas fa-home me-3"></i> Merul Badda,Dhaka 1200, BD
                </p>
                <p>
                  <i className="fas fa-envelope me-3"></i>
                  arnobshoeb@gmail.com
                </p>
                <p>
                  <i className="fas fa-phone me-3"></i> +880 1737 208993
                </p>
                <p>
                  <i className="fas fa-print me-3"></i> +880 1973 208993
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="text-center p-4">
          © 2021 Copyright:
          <Link className="text-reset fw-bold" href="https://mdbootstrap.com/">
            MDBootstrap.com
          </Link>
        </div>
      </footer>
    </div>
  );
}
