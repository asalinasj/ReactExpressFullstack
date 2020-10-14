import React, { useEffect } from 'react';
import axios from 'axios';

const Pokemon = () => {
    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/ditto`)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    },[]);
    return (
        <div>
            <h3>Pokemon</h3>
        </div>
    );
}

export default Pokemon;