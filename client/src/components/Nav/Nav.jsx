

import React, { Component } from "react";
import { Link } from "react-router-dom";
/* import {SiPokemon} from "react-icons/si"; */
import {IoIosArrowForward} from "react-icons/io";
import pokemonsvg from "./pokemon-231.svg";
import "./Nav.scss";

//NO CAMBIEN EL CLASS COMPONENT A FUNCTIONAL COMPONENT PORQUE SINO LOS TEST NO VAN A CORRER!
export default class Nav extends Component {
  render() {
    return (
      <div className="NavBar">
        <tr className="colunm">
          <td className="table">
              <Link className="Link" to="/home"> 
            { <img src={pokemonsvg} alt="pokemon" className="icon"/> }  
              </Link>
          </td>
          <td>
          <IoIosArrowForward className="style.icon2"/>
          </td>
          <td className="table">
              <Link className="Link" to="/create">Create Pokemon</Link>
          </td>
        </tr>
      </div>
    );
  }
}