import React from 'react';

type Pokemon = {
    name: string;
    url: string;
};

type PokemonProps = {
    curr_pokemon: Pokemon[];
    setCurrPokemon: React.Dispatch<React.SetStateAction<Pokemon[]>>;
}

export default function PokemonList({curr_pokemon}: PokemonProps) {
    
  
    return (
        <div>
          <h1>Pokemon List</h1>
          {curr_pokemon.map(p => (
            <div key = {p.name}>{p.name}</div>
          ))}
      
        </div>
    );
}

