import React, {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import axios from 'axios';
import './Detail.css';

interface Pokemon_info {
    name: string;
    sprites: {front_default: string};
    height: number;
    weight: number;
    types: {type: {name: string}}[];
    abilities: {ability: {name: string}}[];

}

const PokemonDetail : React.FC = () => {
    const {name} = useParams<{name: string}>();
    const [pokemon, setPokemon] = useState<Pokemon_info | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPokemon() {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
                setPokemon(response.data);
            } catch (error) {
                console.error("Error fetching pokemon:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchPokemon();
    }, [name]);
    if (loading) {
        return <p>Loading...</p>

    }
    if (!pokemon) {
        return <p>Unknown Pokemon</p>
    }
    return (
        <div className = "detail-container">
            <Link to = "/gallery" className = "back-link">Back to Gallery</Link>
            <h1>{pokemon.name.toUpperCase()}</h1>
            <img src = {pokemon.sprites.front_default} alt = {pokemon.name} className = "pokemon-image" />
            <p><strong>Height:</strong>{pokemon.height}</p>
            <p><strong>Weight:</strong>{pokemon.weight}</p>
            <p><strong>Types:</strong>{pokemon.types.map((type) => type.type.name).join(', ')}</p>
            <p><strong>Abilities:</strong>{pokemon.abilities.map((ability) => ability.ability.name).join(', ')}</p>
        </div>
    );
};

export default PokemonDetail;