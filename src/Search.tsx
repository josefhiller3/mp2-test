import {useState, useEffect, useMemo} from 'react';
import './App.css';
import PokemonList from './pokemon_list';
import axios from 'axios';
import './Search.css';


//source: https://www.youtube.com/watch?v=o3ZUc7zH8BE

interface Pokemon {
  name: string;
  url: string;
  types?: string[];
}

export default function SearchPage() {

  const [curr_pokemon, setCurrPokemon] = useState<Pokemon[]>([]);
  let [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [sortField, setSortField] = useState<"name"|"type">("name");

  useEffect(() => {
  
    setLoading(true);
    const Controller = new AbortController();
    async function fetchPokemon() {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0", {signal: Controller.signal});
        const results = response.data.results;
     
        const detailed_results = await Promise.all(results.map(async (pokemon: Pokemon) => {
          const detailed_response = await axios.get(pokemon.url, {signal: Controller.signal});
          const types = detailed_response.data.types.map((type: {type: {name: string}}) => type.type.name);
          return {...pokemon, types};

      }));

      

       
      setCurrPokemon(detailed_results);
   
      setFilteredPokemon(detailed_results);
  
    } catch (error) {
      console.error("Error fetching pokemon", error);
    } finally {
      setLoading(false);
    }
  }
    fetchPokemon();
    return () => Controller.abort();
  }, []);

  filteredPokemon = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    let filtered = curr_pokemon.filter(p => p.name.toLowerCase().startsWith(term));
    filtered.sort((a,b) => {
      let valA = "";
      let valB = "";
      if (sortField === "name") {
        valA = a.name;
        valB = b.name;
      } else if (sortField === "type") {
        valA = a.types?.[0] || "";
        valB = b.types?.[0] || "";
      }
      if (order === "asc") {
        return valA.localeCompare(valB);
      } else {
        return valB.localeCompare(valA);
      }
    });
    return filtered;
  }, [searchTerm, curr_pokemon, sortField, order]);
  
 
  if (loading) {
    return <div><p>Loading in progress...</p></div>;
  }
  


 
  return (
    <div className = "App">
      <h1>Pokemon Search</h1>

        <input type = "text" placeholder = "Search pokemon" value = {searchTerm} onChange = {(e) => setSearchTerm(e.target.value)} className = "search-input" />
       <div className = "above-sort" >
        <h3>Sort Options:</h3>
          <div className = "sortButtons">
            <button onClick = {() => {setSortField('name'); setOrder('asc');}}>Name A-Z</button>
            <button onClick = {() => {setSortField('name'); setOrder('desc');}}>Name Z-A</button>
            <button onClick = {() => {setSortField('type'); setOrder('asc');}}>Type A-Z</button>
            <button onClick = {() => {setSortField('type'); setOrder('desc');}}>Type Z-A</button>
          </div>
       </div>
     
      
      {searchTerm.trim() !== "" && (<PokemonList curr_pokemon={filteredPokemon} setCurrPokemon={setCurrPokemon}/>)}
     
    </div>
  ); 

}



