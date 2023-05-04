import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import "../asset/css/pokemoncard.css";
import axios from "axios";
import { pokeApi } from "../axios";

const PokemonCard = ({ name }) => {
  const [isExist] = useState(true);

  const [image, setImage] = useState();
  const [type, setType] = useState();
  const [id, setId] = useState();

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      const { data } = await axios.get(`${pokeApi}pokemon/${name}`);

      setImage(data.sprites.other.dream_world.front_default);
      setType(data.types.map((theType) => theType.type.name));
      setId(data.id);
    };
    fetchPokemonDetail();
  }, [name]);

  const cardImg = `card-img ${type && type[0].toLowerCase()}`;
  const typeImg = `./images/${type && type[0]}.svg`;
  return (
    <Col lg={3} md={6} sm={6}>
      <Link to={"/jypokedex/" + name} className="link">
        <div className="card-container">
          <div className={cardImg}>
            <img src={image} className="card-img-size" />
            <img src={typeImg} className="type-img" />
          </div>
          <div className="card-info">
            <div>
              <h4>#{id}</h4>
              <h2>{name}</h2>
            </div>
            <div className="card-type">
              <span className={type && type[0].toLowerCase() + " type"}>
                {type && type[0]}
              </span>
              {isExist ? (
                <span className={type && type[1] + " type"}>
                  {type && type[1]}
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </Link>
    </Col>
  );
};

export default PokemonCard;
