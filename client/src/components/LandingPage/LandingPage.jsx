import React from "react";
import {Link} from "react-router-dom";
import "./LandingPage.scss";

function LandingPage() {
    return (
        <div className="LandingPage">
          <Link to="/home">
            <button className="button-LandingPage button-LandingPage--1">LET'S GO!</button>
          </Link>
        </div>
    );
    }

export default LandingPage;