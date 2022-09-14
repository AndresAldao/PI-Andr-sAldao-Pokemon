import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
const Country = () => {
    const [country, setCountry] = useState([]);

    useEffect(() => {
      const fetchCountry = async () => { 
        const { data } = await axios.get('http://localhost:3001/countries/Chile');
        console.log("🚀 ~ file: App.js ~ line 12 ~ fetchCountry ~ data", data)
        setCountry(data);
      }
  
      fetchCountry();
    }, []);
    return (
        <div>
        <h1>{country.name}</h1>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <img src={country.flag} alt="Country Flag" width="200" />
        </div>
    );
}

export default Country;