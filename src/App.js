import './App.css';
import React, { useEffect, useState } from 'react'
import PokemonList from './component/PokemonList'

function App() {
  const [currentPage, setCurrentPage] = useState('https://pokeapi.co/api/v2/pokemon/');
  const [prevPage, setPrevPage] = useState('');
  const [nextPage, setNextPage] = useState('');
  const [pokeList, setPokeList] = useState([]);

  useEffect(() => {
    fetch(currentPage)
      .then(res => res.json())
      .then(res => {
        setPokeList(res.results);
        setNextPage(res.next);
        setPrevPage(res.previous);
      })
  }, [currentPage]);

  return (
    <div className="App">
      <PokemonList pokeList={pokeList} />
      <div>
        <a>a</a>
      </div>
    </div>
  );
}

export default App;
