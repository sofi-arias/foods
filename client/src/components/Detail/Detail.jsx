import React from 'react';
import { Link } from "react-router-dom";
import { getRecipebyID, Loading } from '../../actions';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import "./Detail.css"

function Detail() {
    const dispatch = useDispatch();
    const recetas = useSelector((state) => state.recipeByID);
    const loader = useSelector(state => state.loader)

    
    const { id } = useParams();
    


    useEffect(() => {
        dispatch(Loading(true));
        dispatch(getRecipebyID(id)).then(()=>dispatch(Loading(false)))
    }, [dispatch]);

    if (loader === false && recetas[0] && recetas[0].id == id) {
        return (
            <div className='detailscontainer' >
                <div className='botondevolver'>
                    <Link to={`/home`}><button>Volver</button></Link>
                </div>
                <h2 className='titlerecipe'>{recetas[0].name}</h2>
                <div className='imgyresumen'>
                    <div className='imgrecipe'>
                        <img src={recetas[0].image} alt="img not found" width="350px" height="250px" />
                    </div>
                    <div className='resumenrecipe'>
                        <h4>Resumen:</h4><p>{recetas[0].summary}</p>
                    </div>
                </div>

                <div className='recipecarac'>
                    <div><h4>Health Score:</h4><p>{recetas[0].healthscore}</p></div>
                    <div><h4>Tipo de dieta:</h4><p>{recetas[0].diets.join(", ")}</p></div>
                    <div><h4>Tipo de plato:</h4><p>{recetas[0].dishtypes}</p></div>

                </div>

                <div className='stepsinfo'>
                    <h4 className='titlesteps'>Paso a paso:</h4>
                    <ol>
                        {Array.isArray(recetas[0].steps) ? recetas[0].steps.map(e => {
                            return (
                                <li>{e}</li>
                            )
                        }) : <p>No se informaron pasos a seguir para esta receta</p>}</ol>
                </div>

            </div>
        );
    } else {
        return (
            <Loader />
        )
    }
}

export default Detail;