

import React, { Component } from "react";
import { Link } from "react-router-dom";
import style from "./Nav.module.css";
/* import {SiPokemon} from "react-icons/si"; */
import {IoIosArrowForward} from "react-icons/io";
import pokemonsvg from "./pokemon-231.svg";

//NO CAMBIEN EL CLASS COMPONENT A FUNCTIONAL COMPONENT PORQUE SINO LOS TEST NO VAN A CORRER!
export default class Nav extends Component {
  render() {
    return (
      <div className={style.NavBar}>
        <tr className={style.colunm}>
          <td className={style.table}>
              <Link className={style.Link} to="/home"> 
            { <img src={pokemonsvg} alt="pokemon" className={style.icon}/> }  
              </Link>
          </td>
          <td>
          <IoIosArrowForward className={style.icon2}/>
          </td>
          <td className={style.table}>
              <Link className={style.Link} to="/create">Create Pokemon</Link>
          </td>
        </tr>
      </div>
    );
  }
}