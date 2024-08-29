import React from 'react';
import './Cssfolder/Card-style.css';

const Cards = (props) => {
    const typeColors = {
        fire: '#F08030',
        water: '#6890F0',
        grass: '#78C850',
        electric: '#F8D030',
        psychic: '#F85888',
        ice: '#98D8D8',
        dragon: '#7038F8',
        dark: '#705848',
        fairy: '#EE99AC',
        normal: '#A8A878',
        fighting: '#C03028',
        flying: '#A890F0',
        poison: '#A040A0',
        ground: '#E0C068',
        rock: '#B8A038',
        bug: '#A8B820',
        ghost: '#705898',
        steel: '#B8B8D0',
    };

    const primaryTypeColor = typeColors[props.pkmType1];
    const secondaryTypeColor = props.pkmType2 ? typeColors[props.pkmType2] : null;

    return (
        <div className="card">
            <div className="card-backgr">
                <img src="src/components/green.png" alt="Background" />
            </div>
            <div className="card-number">{props.pkmID}</div>
            <div className="card-image">
                <img src={props.PknImage} alt="Card Image" />
            </div>
            <div className="card-title">
                <div className="card-name">{props.pknName}</div>
                <div className="card-type">
                    <span 
                        className="type-badge" 
                        style={{ backgroundColor: primaryTypeColor }}
                    >
                        {props.pkmType1}
                    </span>
                    {props.pkmType2 && (
                        <span 
                            className="type-badge" 
                            style={{ backgroundColor: secondaryTypeColor }}
                        >
                            {props.pkmType2}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cards;