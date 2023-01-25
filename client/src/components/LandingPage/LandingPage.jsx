import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css"

export default function LandingPage() {
    return (
        <div className="landingbackground">
            <div className="contlanding">
                <h1>PI FOOD HENRY - Sofia Arias</h1>
                <Link to='/home'>
                    <button className="enterbutton">ENTRAR</button>
                </Link>
            </div>
        </div>

    )
}