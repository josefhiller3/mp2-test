
import {Route, Routes, Link, BrowserRouter} from 'react-router-dom';
import SearchPage from './Search'
import GalleryPage from './Gallery'
import PokemonDetail from './Detail'
import './App_styles.css';
//abc
//source: https://www.youtube.com/watch?v=o3ZUc7zH8BE




function App() {
 
  return (
    <BrowserRouter basename = "/mp2-test">
      <nav className = "nav-links">
        <Link to = "/"  className = "links">Search</Link>
        <Link to = "/gallery" className = "links">Gallery</Link>
      </nav>
      <Routes>
        <Route path = "/" element = {<SearchPage />}/>
        <Route path = "/gallery" element = {<GalleryPage />}/>
        <Route path = "/pokemon/:name" element = {<PokemonDetail />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;