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

    // Scroll to top on next page
    window.scrollTo(0, 0)

  }, [currentPage]);

  const goToNextPage = () => {
    setCurrentPage(nextPage);
  }

  const goToPrevPage = () => {
    setCurrentPage(prevPage);
  }

  return (
    <div className="App">
      <h1>Pokedex</h1>
      <PokemonList pokeList={pokeList} />
      <div>
        <button className='page_button' id='prev' onClick={goToPrevPage}>Prev</button>
        <button className='page_button' id='next' onClick={goToNextPage}>Next</button>
      </div>
    </div>
  );
}

export default App;
