import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  return (
    <nav className="nav">
      <div className="container">
        <div className="nav-content">
          <Link to="/" className="nav-logo">MovieMate</Link>

          <div className="nav-search">
            <input type="text" placeholder="Search movies..." className="search-input"/>
          </div>

          <div className="nav-links">
            <Link to="/browse" className="nav-link">Browse Movies</Link>
            <Link to="/reviews" className="nav-link">Reviews</Link>
            <Link to="/platforms" className="nav-link">Stream Platforms</Link>
            <Link to="/addmovie" className="nav-link">Add New Movie</Link>
            <Link to="/auth" className="nav-link">Account</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';

// function NavbarComponent() {
//   return (
//     <Navbar expand="lg" className="bg-body-tertiary">
//       <Container>
//         <Navbar.Brand href="#home">Watchmate</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto">
//             <Nav.Link href="#home">Home</Nav.Link>
//             <Nav.Link href="#link">Browse Movie</Nav.Link>
//             <NavDropdown title="Stream Platforms" id="basic-nav-dropdown">
//               <NavDropdown.Item href="#action/3.1">Hulu</NavDropdown.Item>
//               <NavDropdown.Item href="#action/3.2">
//                 Netflix
//               </NavDropdown.Item>
//               <NavDropdown.Item href="#action/3.3">Amazon</NavDropdown.Item>
//               <NavDropdown.Divider />
//               <NavDropdown.Item href="#action/3.4">
//                 Separated link
//               </NavDropdown.Item>
//             </NavDropdown>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default NavbarComponent;
