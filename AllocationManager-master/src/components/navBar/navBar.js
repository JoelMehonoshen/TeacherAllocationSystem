import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav } from "react-bootstrap"

export function NavBar() {
  return (
  <Navbar bg="light" expand="lg">
  <Navbar.Brand href="/">QUT</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/Allocations">Allocations</Nav.Link>
      <Nav.Link href="/Academics">Academics</Nav.Link>
      <Nav.Link href="/Units">Units</Nav.Link>
      <Nav.Link href="/Import">Import</Nav.Link>
      <Nav.Link href="/Export">Export</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>); 
}
