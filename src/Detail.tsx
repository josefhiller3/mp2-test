import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
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
    const [PokemonList, setPokemonList] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPokemon() {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
                setPokemon(response.data);
            } catch (error) {
                console.error("Error fetching pokemon:", error);
                setPokemon(null);
            } finally {
                setLoading(false);
            }
        }
        fetchPokemon();
    }, [name]);
   
    useEffect(() => {
        async function fetchPokemonList() {
        try{
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0`);
            const names = response.data.results.map((p : {name: string}) => p.name);
            setPokemonList(names);
        } catch (error) {
            console.error("Error fetching pokemon list: ", error);
        } 
    }
        fetchPokemonList();
    }, []);

    if (loading) {
        return <p>Loading...</p>

    }
    if (!pokemon) {
        return <p>Unknown Pokemon</p>
    }
    const current_index = PokemonList.findIndex((p) => p === pokemon.name);
    const prevName = current_index > 0 ? PokemonList[current_index - 1] : null;
    const nextName = current_index < PokemonList.length - 1 ? PokemonList[current_index + 1] : null;
    const handlePrevious = () => {
        if (prevName) {
            navigate(`/pokemon/${prevName}`);
        }
    }
    const handleNext = () => {
        if (nextName) {
            navigate(`/pokemon/${nextName}`);
        }
    }
    return (
        <div className = "detail-container">
            
            
            <h1>{pokemon.name.toUpperCase()}</h1>
            <img src = {pokemon.sprites.front_default} alt = {pokemon.name} className = "pokemon-image" />
            <p><strong>Height:</strong>{pokemon.height}</p>
            <p><strong>Weight:</strong>{pokemon.weight}</p>
            <p><strong>Types:</strong>{pokemon.types.map((type) => type.type.name).join(', ')}</p>
            <p><strong>Abilities:</strong>{pokemon.abilities.map((ability) => ability.ability.name).join(', ')}</p>
            <div className = "button-container">
                <button onClick = {handlePrevious} disabled = {!prevName}>Previous</button>
                <button onClick = {handleNext} disabled = {!nextName}>Next</button>
            </div>
        </div>
    );
};


export default PokemonDetail;