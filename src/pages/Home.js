import React, { useState, useEffect } from 'react'
import NavigationBar from '../components/NavigationBar'
import PokemonCard from '../components/PokemonCard'
import { Row, Spinner } from 'react-bootstrap'
import '../asset/css/home.css'
import { pokeApi } from '../util/api'

const Home = () => {

    const [Pokemons, setPokemons] = useState([])
    const [loadMore, setLoadMore] = useState(`${pokeApi}pokemon?limit=20`)
    const [loading, setLoading] = useState(false)
    const getAllPokemons = async () => {
        const res = await fetch(loadMore)
        const data = await res.json()
        setLoadMore(data.next)

        function createPokemonObject(results) {
            results.forEach(async pokemon => {
                const res = await fetch(`${[pokeApi]}pokemon/${pokemon.name}`)
                const data = await res.json()
                setPokemons(currentList => [...currentList, data])
                await Pokemons.sort((a, b) => a.id - b.id)
            })
        }
        createPokemonObject(data.results)
        setLoading(true)
    }
    useEffect(() => {
        getAllPokemons()
    }, [])

    document.title = "JY-Pokedex"


    return (
        <>
            <NavigationBar />
            <div className='body-size'>
                <Row>
                    {loading ? Pokemons.map((pokemonStats, index) =>
                        <PokemonCard
                            key={index}
                            id={pokemonStats.id}
                            image={pokemonStats.sprites.other.dream_world.front_default}
                            name={pokemonStats.name}
                            type={pokemonStats.types.map((theType) => theType.type.name)}
                        />
                    ) :
                        <div className='loading'>
                            <Spinner animation="border" variant="light" size="lg" />
                        </div>}
                </Row>
                <a className='loadmore mt-5 mb-5' onClick={() => getAllPokemons()}>Load More Pokemon</a>
            </div>
        </>
    )
}

export default Home