import React from "react";
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { getNameRecipe,Loading } from "../../actions";
import Loader from "../Loader/Loader";
import './SearchBar.css'

export default function SearchBar({paginado}){
const dispatch = useDispatch()

const loader = useSelector(state=> state.loader)

const [name, setName] = useState("")

function handleInput(e){
    e.preventDefault();
    setName(e.target.value);
}

async function handleSubmit(e){
    e.preventDefault();
    dispatch(Loading());
    await dispatch(getNameRecipe(name))
    dispatch(Loading());
    paginado(1)
    setName("")
}

if (loader=== true){
    return(
        <div className="searchcontainer">
            <div class="search">
        <input value={name} type="text" class="search__input" placeholder="Buscar receta" onChange={e =>handleInput(e)}/>
        <button class="search__button" onClick={e=> handleSubmit(e)}>
            <svg class="search__icon" aria-hidden="true" viewBox="0 0 24 24">
                <g>
                    <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                </g>
            </svg>
        </button>
    </div>
        </div>
    )
}else{
    return(
        <Loader/>
    )
}

}