import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Routes, Link, BrowserRouter} from 'react-router-dom';
import SearchPage from './Search'
import GalleryPage from './Gallery'
//abc
//source: https://www.youtube.com/watch?v=o3ZUc7zH8BE

interface Pokemon {
  name: string;
  url: string;
  types?: string[];
}



function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("name");
  const [order, setOrder] = useState("asc");
  const [filteredPokemon, setCurrPokemon] = useState<string[]>([]);
  return (
    <BrowserRouter basename = "/mp2-test">
      <nav style = {{margin: "1rem"}}>
        <Link to = "/" style = {{marginRight: "1rem"}}>Search</Link>
        <Link to = "/gallery" style = {{marginRight: "1rem"}}>Gallery</Link>
      </nav>
      <Routes>
        <Route path = "/" element = {<SearchPage />}/>
        <Route path = "/gallery" element = {<GalleryPage />}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App;