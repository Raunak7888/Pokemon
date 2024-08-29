import React, { useEffect, useState } from "react";
import Cards from "./Cards.jsx";
import LoadMore from './LoadMore';
import './Cssfolder/Card-style.css';
import './Cssfolder/fetchapi.css';

const Fetchapi = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [load, setLoad] = useState(24);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPokemonList = async (limit, offset) => {
        try {
            setLoading(true);
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
            const data = await response.json();

            // Process the fetched data
            const initialList = data.results.map((pokemon, index) => ({
                id: offset + index + 1, // Assuming that the ID is derived from the index
                name: pokemon.name,
                url: pokemon.url,
                image: null,
                type1: null,
                type2: null,
            }));

            setPokemonList(prevList => [...prevList, ...initialList]);

            // Fetch details for each Pokémon
            data.results.forEach((pokemon, index) => {
                fetchPokemonDetails(pokemon.url, offset + index);
            });

            setLoading(false);
        } catch (error) {
            console.error("Error fetching Pokémon list:", error);
            setError("Failed to load Pokémon. Please try again.");
            setLoading(false);
        }
    };

    const fetchPokemonDetails = async (url, index) => {
        try {
            const response = await fetch(url);
            const pokemonData = await response.json();
            
            // Log the primary type of the Pokémon to the console
            console.log(pokemonData.types[0].type.name);

            setPokemonList((prevList) => {
                const newList = [...prevList];
                const existingPokemonIndex = newList.findIndex(pokemon => pokemon.id === index + 1);
                if (existingPokemonIndex !== -1) {
                    newList[existingPokemonIndex] = {
                        ...newList[existingPokemonIndex],
                        image: pokemonData.sprites.front_default,
                        type1: pokemonData.types[0].type.name,
                        type2: pokemonData.types[1] ? pokemonData.types[1].type.name : null,
                    };
                }
                return newList;
            });
        } catch (error) {
            console.error(`Error fetching Pokémon details from ${url}:`, error);
            setError("Failed to load Pokémon details. Please try again.");
        }
    };

    useEffect(() => {
        fetchPokemonList(load, offset);
    }, [load, offset]);

    const handleLoadMore = () => {
        setOffset(prevOffset => prevOffset + load);
    };

    return (
        <div>
            {error && <div className="error">{error}</div>}
            {loading && <div className="loading">Loading...</div>}
            <div className="pkn-cards">
                {pokemonList.filter(pokemon => pokemon.image !== null).map(pokemon => (
                    <Cards 
                        key={pokemon.id}
                        pkmID={pokemon.id}
                        PknImage={pokemon.image}
                        pknName={pokemon.name}
                        pkmType1={pokemon.type1}
                        pkmType2={pokemon.type2}
                    />
                ))}
            </div>
            {!loading && <LoadMore onLoadMore={handleLoadMore} />}
        </div>
    );
}

export default Fetchapi;