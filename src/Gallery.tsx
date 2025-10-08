import React, {useEffect, useState} from 'react';
import axios from 'axios';
import "./Gallery.css";

interface Pokemon {
    name: string;
    url: string;
    types?: string[];
    sprite?: string;
}

// boilerplate code from Cursor
  const Gallery : React.FC = () => {
    const [pokeList, setPokeList] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      async function fetchPokemon() {
        try {
          const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0");
          const results = response.data.results;
          const detailed_results = await Promise.all(results.map(async (p: Pokemon) => {
          const res = await axios.get(p.url);
          const types = res.data.types.map((type: {type: {name: string}}) => type.type.name);
          const sprite = res.data.sprites.front_default;
          return {...p, types, sprite};
        }))
          setPokeList(detailed_results);
        } catch (error) {
            console.error("Error fetching pokemon:", error);
        } finally {
            setLoading(false);
        }
    }

    fetchPokemon();
    }, []);
  
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className = "gallery-container">
        {pokeList.map((pokemon) => (
            <div key = {pokemon.name} className = "pokemon-card">
                <img src = {pokemon.sprite} alt = {pokemon.name} className='pokemon-image' />
                  <h3 className = "pokemon-name">{pokemon.name}</h3>
                  <p className = "pokemon-type">{pokemon.types && pokemon.types.length > 0 ? pokemon.types[0] : "Unknown"}</p>
                 
                
                </div>
        ))}
    </div>
    );
};

export default Gallery;
