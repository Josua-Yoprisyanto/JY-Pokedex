import React, { useState, useEffect } from "react";
import NavigationBar from "../components/NavigationBar";
import PokemonCard from "../components/PokemonCard";
import { Row, Spinner } from "react-bootstrap";
import "../asset/css/home.css";
import { pokeApi } from "../axios/";
import axios from "axios";

const Home = () => {
  const [limit, setLimit] = useState(20);
  const [allPokemons, setAllPokemons] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      const { data } = await axios.get(`${pokeApi}pokemon?limit=${limit}`);

      setAllPokemons(data);
      setLoading(false);
    };
    fetchPokemon();
  }, [limit]);

  const [allSearchPokemon, setAllSearchPokemon] = useState();
  useEffect(() => {
    const fetchPokemons = async () => {
      const { data } = await axios.get(`${pokeApi}pokemon?limit=100000`);

      setAllSearchPokemon(data);
    };
    fetchPokemons();
  }, []);

  document.title = "JY-Pokedex";

  return (
    <>
      <NavigationBar allPokemons={allSearchPokemon} />
      <div className="body-size">
        <Row>
          {!loading ? (
            allPokemons?.results?.map((pokemonStats, index) => (
              <PokemonCard key={index} name={pokemonStats.name} />
            ))
          ) : (
            <div className="loading">
              <Spinner animation="border" variant="light" size="lg" />
            </div>
          )}
        </Row>
        <span
          className="loadmore mt-5 mb-5"
          onClick={() => setLimit(limit + 20)}
        >
          Load More Pokemon
        </span>
      </div>
    </>
  );
};

export default Home;
