import React from "react";
import { NavBar } from "../navBar/navBar.js";
import { Row, Col, Container } from "react-bootstrap"

// TODO: Replace bootstrap with react-bootstrap

export function Units(props) {
    return (
      <Container fluid>
        <NavBar />
        <br />
        <div class="container-fluid">
          <div class="container">
            <div class="row card-img-style text-dark">
              <div class="col-sm-8">
                <h2>Add a Unit</h2>
                <br />
                <form action="/action_page.php">
                  <div class="form-group">
                    <label for="email">Name of the Unit:</label>
                    <input
                      type="text"
                      class="form-control"
                      id="email"
                      placeholder="Name"
                      name="text"
                    />
                  </div>

                  <div class="form-group">
                    <label for="email">Unit ID:</label>
                    <input
                      type="text"
                      class="form-control"
                      id="email"
                      placeholder="E.g., ABC123"
                      name="text"
                    />
                  </div>

                  <div class="form-group">
                    <label for="comment">Unit Description:</label>
                    <textarea class="form-control" rows="5" id="comment" />
                  </div>

                  <div class="form-inline">
                    <label for="exampleFormControlSelect1">Availability:</label>
                    &nbsp;&nbsp;
                    <select class="form-control" id="exampleFormControlSelect1">
                      <option>Select</option>
                      <option>Semester 1</option>
                      <option>Semester 2</option>
                      <option>Both</option>
                    </select>
                    &nbsp;&nbsp;
                    <input
                      type="text"
                      class="form-control"
                      id="email"
                      placeholder="Year"
                      name="text"
                    />
                  </div>

                  <br />

                  <div class="form-inline">
                    <label for="exampleFormControlSelect1">Faculty:</label>
                    &nbsp;&nbsp;
                    <select class="form-control" id="exampleFormControlSelect1">
                      <option>All</option>
                      <option>Science and Engineering</option>
                      <option>Law</option>
                      <option>Business</option>
                    </select>
                  </div>

                  <br />

                  <div class="form-inline">
                    <label for="email">Search Keywords (Tags):</label>
                    &nbsp;&nbsp;
                    <input
                      type="text"
                      class="form-control"
                      id="email"
                      placeholder=""
                      name="Search"
                    />
                    &nbsp;&nbsp;
                    <label class="form-check-label">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        name="remember"
                      />{" "}
                      Search as Title only
                    </label>
                  </div>

                  <br />

                  <div class="form-inline">
                    <label for="exampleFormControlSelect1">
                      Credit Points:
                    </label>
                    &nbsp;&nbsp;
                    <select class="form-control" id="exampleFormControlSelect1">
                      <option>Select</option>
                      <option>8</option>
                      <option>12</option>
                      <option>24</option>
                    </select>
                  </div>

                  <br />

                  <div class="form-inline">
                    <label for="exampleFormControlSelect1">Requisites:</label>
                    &nbsp;&nbsp;
                    <select class="form-control" id="exampleFormControlSelect1">
                      <option>Select</option>
                      <option>Pre-Requisites</option>
                      <option>Anti-Requisites</option>
                      <option>None</option>
                    </select>
                    &nbsp;&nbsp;
                    <input
                      type="text"
                      class="form-control"
                      id="email"
                      placeholder="Year"
                      name="text"
                    />
                  </div>

                  <br />

                  <div class="form-inline">
                    <label for="email">Unit Fees($):</label>
                    &nbsp;&nbsp;
                    <input
                      type="text"
                      class="form-control"
                      id="email"
                      placeholder="Domestic Students"
                      name="text"
                    />
                    &nbsp;&nbsp;
                    <label class="form-check-label">
                      &nbsp;&nbsp;
                      <input
                        type="text"
                        class="form-control"
                        id="email"
                        placeholder="International Students"
                        name="text"
                      />
                    </label>
                  </div>

                  <br />

                  <button type="submit" class="btn btn-primary">
                    Create Unit
                  </button>
                </form>
              </div>

              <div class="col-sm-4">
                Add Documents:&nbsp;&nbsp;
                <input type="file" id="myFile" />
              </div>
            </div>
          </div>
        </div>

        <footer class="footer card-img-style">
          <div class="container text-center text-dark">
            <p>Copyright &copy; Queensland University of Technology</p>
          </div>
        </footer>
      </Container>
    );
  }