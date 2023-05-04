import React, { useState } from "react";
import { Navbar, Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { useNavigate, Link } from "react-router-dom";

const NavigationBar = ({ allPokemons }) => {
  const [endPoint, setEndpoint] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/jypokedex/${endPoint[0].toLowerCase()}`);
  };
  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      style={{
        boxShadow:
          " inset 0 0 10px 1px #00bfff, 0 0 10px 1px #00bfff, 0 0 0 2px white",
      }}
    >
      <div className="navbar-size">
        <div className="header">
          <Navbar.Brand className="mt-2 mb-2">
            <Link to="/" className="link">
              <strong>JY-Pokedex</strong>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" className="toggle" />
        </div>
        <div className="searchbar">
          <Navbar.Collapse
            id="navbarScroll"
            className="justify-content-end mt-2 mb-2"
          >
            <Form className="d-flex">
              <Typeahead
                options={allPokemons?.results}
                labelKey={(option) => option.name}
                placeholder="Enter The Pokemon Name or ID"
                className="me-2 search"
                value={endPoint}
                onChange={(selected) => {
                  setEndpoint(selected.map((pokemon) => pokemon.name));
                }}
              />
              <button className="search-button" onClick={handleSubmit}>
                Search
              </button>
            </Form>
          </Navbar.Collapse>
        </div>
      </div>
    </Navbar>
  );
};

export default NavigationBar;
