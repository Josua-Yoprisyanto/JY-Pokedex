import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Col } from 'react-bootstrap'
import '../asset/css/pokemoncard.css'

const PokemonCard = ({ id, image, name, type }) => {
    const [isExist] = useState(true);

    const cardImg = `card-img ${type[0].toLowerCase()}`;
    const typeImg = `./images/${type[0]}.svg`
    return (
        <Col lg={3} md={6} sm={6}>
            <Link to={"/jypokedex/"+name} className="link">
                <div className='card-container'>
                    <div className={cardImg}>
                        <img src={image} className="card-img-size" />
                        <img src={typeImg} className="type-img" />
                    </div>
                    <div className="card-info">
                        <div>
                            <h4>#{id}</h4>
                            <h2>{name}</h2>
                        </div>
                        <div className='card-type'>
                            <span className={type[0].toLowerCase()+" type"}>{type[0]}</span>
                            {isExist ? <span className={type[1]+" type"}>{type[1]}</span> : ""}
                        </div>
                    </div>
                </div>
            </Link>
        </Col>

    )
}

export default PokemonCard