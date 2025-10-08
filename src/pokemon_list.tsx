import React from 'react';
import { Link } from 'react-router-dom';

type Pokemon = {
    name: string;
    url: string;
    types?: string[];
};

type PokemonProps = {
    curr_pokemon: {name: string, url: string, types?: string[]}[];
    setCurrPokemon: React.Dispatch<React.SetStateAction<{name: string, url: string, types?: string[]}[]>>;
}

export default function PokemonList({curr_pokemon}: PokemonProps) {
    
  
    return (
      <ul style = {{listStyle: "none", padding: 0}}>
        {curr_pokemon.map((p: Pokemon) => (
            <li key = {p.name} style = {{marginBottom: '1rem'}}>
              <Link to = {`/pokemon/${p.name}`} style = {{textDecoration: 'none', color: "black", border: "1px solid #ccc", borderRadius: "8px", padding: "0.5rem", display: "block", background: "#f8f8f8", transition: "0.2s"}}>
                <strong>{p.name}</strong>
                <br/>
                {p.types && <small>Type: {p.types[0]}</small>}
              </Link> 
            </li>
        ))}
       </ul>
  
    );
}

