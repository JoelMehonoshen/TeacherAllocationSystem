import React from "react";
import { NavBar } from "../navBar/navBar.js";
import { Jumbotron, Button } from "react-bootstrap"
import { Container } from "react-bootstrap"

export function homePage(props) {

  window.onbeforeunload=null; // Supress "reload page" warnings

    return (
      <Container fluid>
        <NavBar />
        <Jumbotron>
          <center>
          <h1>Teaching Allocation System</h1>
          <p>
            A system for allocation management and optimization.
          </p>
          <p>
            <Button href="/Allocations" variant="primary">Start Allocating</Button>
          </p>
          </center>
        </Jumbotron>
      </Container>
    );
  }