import React from 'react'

const PokemonList = ({ pokeList }) => {
    let index;

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Extract the id from url & create link to the pokemon sprite
    const getPokemonSpriteURL = url => {
        const pokedexNumbRegex = '^.+/([0-9]+)/$';
        index = url.match(pokedexNumbRegex)[1];
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`
    }

    const getType = index => {
        let t = "";

        fetch(`https://pokeapi.co/api/v2/pokemon/${index}`)
        .then(res => res.json())
        .then(res => res.types)
        .then(typeArr => typeArr.map(elem => capitalizeFirstLetter(elem.type.name)))
        .then(types => {
            document.getElementById(`${index}`).innerHTML = types.toString().replace(",", ", ");
        })
        .catch(err => console.log(err));

        return <div className="type" id={index}>{}</div>
    }

    const getDetail = (url) => {
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${index}/`)
            .then(res => res.json())
            // .then(a => console.log(a))
            .then(result => result.flavor_text_entries[0].flavor_text.toString())
            .then(r => {
                document.getElementById(url).innerHTML = r;
            })
            .catch(err => console.log(err))

        return <div id={url}>{}</div>
    }

    return pokeList.map(pokemon => {
        return <div className='card' key={pokemon.name}>
            <h1>{capitalizeFirstLetter(pokemon.name)}</h1>
            <img id='sprite' src={getPokemonSpriteURL(pokemon.url)} alt='pokemon'></img>
            {getType(index)}
            {getDetail(pokemon.url)}
        </div>
    })
}


export default PokemonList;