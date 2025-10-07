import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import PokemonList from './pokemon_list';
import axios, { CancelToken } from 'axios';
import Transportation from './transportation';
//abc
//source: https://www.youtube.com/watch?v=o3ZUc7zH8BE

interface Pokemon {
  name: string;
  url: string;
}

function App() {
  const [curr_pokemon, setCurrPokemon] = useState<Pokemon[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currPageURL, setCurrPageURL] = useState("https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0");
  const [previousPageURL, setPreviousPageURL] = useState();
  const [nextPageURL, setNextPageURL] = useState();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
    // const handleSearch = async (term: string) => {
  //   if (!term) {
  //     return;
  //   }
  //   setLoading(true);
  //   try {
  //     const response = await axios.get('https://pokeapi.co/api/v2/pokemon/${term.toLowerCase()}');
  //     setCurrPokemon([{name: response.data.name, url: 'https://pokeapi.co/api/v2/pokemon/${response.data.id}/' }]);
  //   } catch(error) {
  //     console.error("Error fetching pokemon:", error);
  //     setCurrPokemon([]);
  //   } finally {
  //     setLoading(false);
  //   }
  // }
  
  useEffect(() => {
  
    setLoading(true);
    const Controller = new AbortController();
    axios.get(currPageURL, {signal: Controller.signal}).then(res => {setCurrPokemon(res.data.results) 
      setLoading(false);
      setFilteredPokemon(res.data.results);
      setPreviousPageURL(res.data.previous)
      setNextPageURL(res.data.next)

    }).catch(err => console.error("Error fetching pokemon from API: ", err)); return () => Controller.abort()}, []);
  useEffect(() => {
    const term = searchTerm.trim().toLowerCase();
   
    let filtered = curr_pokemon.filter(pokemon => pokemon.name.toLowerCase().startsWith(term));
    filtered = filtered.sort((a, b) => {
      if (order === "asc") {
        return a.name.localeCompare(b.name);

      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setFilteredPokemon(filtered);

  }, [searchTerm, curr_pokemon, order]);
    function goToNextPage() {
    if (nextPageURL) {
      setCurrPageURL(nextPageURL);
    }
  }
  function goToPreviousPage() {
    if (previousPageURL) {
      setCurrPageURL(previousPageURL);
    }
  }
  if (loading) {
    return <div><p>Loading in progress...</p></div>;
  }
  
  
  return (
    <div className = "App">
      <h1>Pokemon Search</h1>

        <input type = "text" placeholder = "Search pokemon" value = {searchTerm} onChange = {(e) => setSearchTerm(e.target.value)} className = "search-input" />
       <div style = {{marginBottom: '1rem'}}>
        <button onClick = {() => setOrder('asc')}>Sort A-Z</button>
        <button onClick = {() => setOrder('desc')}>Sort Z-A</button>
       </div>
      {searchTerm.trim() !== "" && (<PokemonList curr_pokemon={filteredPokemon} setCurrPokemon={setCurrPokemon}/>)}
      <Transportation goToNextPage = {goToNextPage} goToPreviousPage = {goToPreviousPage} />
    </div>
  );

}


export default App;
