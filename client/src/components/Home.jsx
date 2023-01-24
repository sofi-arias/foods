import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getRecipes } from '../actions';
import {Link} from 'react-router-dom';

export default function Home (){
    const dispatch = useDispatch()
    const allRecipes = useSelector((state) => state.recipes)
    
    useEffect (()=>{
        dispatch(getRecipes())
    },[])

    function handleClick(e){
        e.preventDefault();
        dispatch(getRecipes());
    }

    return (
        <div>
            <Link to= '/createrecipe'><button>Crear receta</button></Link>
            <h1>Nuevas recetas</h1>
            <button onClick={e=> {handleClick(e)}}>
                Volver a cargar todas las recetas
            </button>
            <div>
                
            </div>
        </div>
    )
}