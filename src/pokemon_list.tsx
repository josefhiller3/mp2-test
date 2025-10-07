import React from 'react';

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
        <div>
          
          {curr_pokemon.map((p) => (
            <div key = {p.name} style = {{marginBottom: '0.5rem'}}>
              <strong>{p.name}</strong> 
              <span style = {{marginLeft: '0.5rem', color: 'gray'}}>
                {p.types?.[0] || "Unknown"}
              </span>
            
            </div>
          ))}
      
        </div>
    );
}

