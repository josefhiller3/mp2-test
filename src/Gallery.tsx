import React, {useEffect, useState} from 'react';
import axios from 'axios';
import "./Gallery.css";
import {Link} from 'react-router-dom';

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
    const [filteredList, setFilteredList] = useState<Pokemon[]>([]);
    const [selectedType, setSelectedType] = useState<string>("all");


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
          setFilteredList(detailed_results);
        } catch (error) {
            console.error("Error fetching pokemon:", error);
        } finally {
            setLoading(false);
        }
    }

    fetchPokemon();
    }, []);

    useEffect(() => {
        if (selectedType === "all") {
            setFilteredList(pokeList);

        } else {
            const filtered = pokeList.filter((p) => p.types && p.types.length > 0 && p.types[0].toLowerCase() === selectedType.toLowerCase());
            setFilteredList(filtered);
            
         }
        }, [selectedType, pokeList]);

        if (loading) {
            return <p> Loading...</p>;

        }
        const uniqueTypes = Array.from(new Set(pokeList.map((p) => p.types && p.types[0]?.toLowerCase()).filter(Boolean))).sort();
        return (
            <div className = "whole-return">
            <div className = "gallery-container">
                <div className = "filter-container">
                    <label htmlFor = "typeFilter">Filter by Type: </label>
                    <select id = "typeFilter" value = {selectedType} onChange = {(e) => setSelectedType(e.target.value)}>
                        <option value = "all">All</option>
                        {uniqueTypes.map((type) => (<option key = {type} value = {type!}>{type}</option>))}
                    </select>
                </div>
            </div>
              <div className = "gallery-container">
              {filteredList.map((pokemon) => (
                  <Link key = {pokemon.name} to = {`/pokemon/${pokemon.name}`} className = "pokemon-link">
                    <div className = "pokemon-card">
                      <img src = {pokemon.sprite} alt = {pokemon.name} className='pokemon-image' />
                        <h3 className = "pokemon-name">{pokemon.name}</h3>
                        <p className = "pokemon-type">{pokemon.types && pokemon.types.length > 0 ? pokemon.types[0] : "Unknown"}</p>
                       
                      </div>
                  </Link>
              ))}
          </div>
          </div>
           
        )

};

export default Gallery;
