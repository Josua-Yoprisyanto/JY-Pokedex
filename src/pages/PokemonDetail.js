import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import NavigationBar from '../components/NavigationBar'
import { pokeApi } from '../axios/';
import '../asset/css/pokemondetail.css'
import { ProgressBar, Row, Col, Spinner } from 'react-bootstrap';


const PokemonDetail = () => {
  const [loading, setLoading] = useState(false)
  const params = useParams();
  const [detail, setDetail] = useState([])
  const [title, setTitle] = useState("")
  const getDetail = async () => {
    await axios.get(`${pokeApi}pokemon/${params.name}`)
      .then((res) => setDetail(res.data))
    setLoading(true)
  }

  useEffect(() => {
    getDetail()
  }, [params])

  document.title = `JY-Pokedex - ${detail.name}`

  return (
    <>
      <NavigationBar />
      {loading ?
        <div className='detail-container'>
          <div className='detail-box  mt-5 mb-5'>
            <h1>{detail.name.toUpperCase()}</h1>
            <div className='pokemon-img'>
              <img src={detail.sprites.other.dream_world.front_default} />
            </div>
            <Row className='pokemon-details'>
              <Col sm={6} className="details">
                <h3>Height</h3>
                <span>{detail.height / 10} M</span>
              </Col>
              <Col sm={6} className="details">
                <h3>Weight</h3>
                <span>{detail.weight / 10} KG</span>
              </Col>
              <Col sm={6} className="details">
                <h3>Type</h3>
                {detail.types.map((thetype, index) =>
                  <span className={thetype.type.name + " type"} key={index}>{thetype.type.name}</span>
                )}
              </Col>
              <Col sm={6} className="details">
                <h3>Ability</h3>
                {detail.abilities.map((theability, index) =>
                  <span className='ability' key={index}>{theability.ability.name}</span>
                )}
              </Col>
            </Row>
            {detail.stats.map((thestat, index) => (
              <div className='stat-container' key={index}>
                <h5 className='stat-name' >{thestat.stat.name.toUpperCase()}</h5>
                <ProgressBar now={thestat.base_stat} label={thestat.base_stat} max="200" className="stat" />
              </div>
            ))}
          </div>
        </div>
        :
        <div className='loading'>
          <Spinner animation="border" variant="light" size="lg" />
        </div>}

    </>
  )
}

export default PokemonDetail