import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, filterByDiets, getDiets, orderByName, orderByHS, Loading } from '../../actions';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import Card from '../Card/Card';
import Paginado from '../Paginado/Paginado';
import SearchBar from '../SearchBar/SearchBar';
import './Home.css'

export default function Home() {

    const dispatch = useDispatch()
    const allRecipes = useSelector((state) => state.recipes)
    const diets = useSelector((state) => state.diets)
    const loader = useSelector(state => state.loader)

    const [currentPage, setCurrentPage] = useState(1)
    const [ orden, setOrden] = useState('')


    const recipesPerPage = 9;
    const indexOfLastRecipe = currentPage * recipesPerPage
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(async () => {
        dispatch(Loading());
        await dispatch(getRecipes());
        dispatch(getDiets());
        dispatch(Loading());
    }, [dispatch])



    function handleCLick(e) {
        e.preventDefault();
        dispatch(Loading());
        setCurrentPage(1);
        dispatch(getRecipes());
        dispatch(Loading());
    }

    async function handleFilterDiets(e) {
        e.preventDefault();
        await dispatch(getRecipes());
        
        dispatch(filterByDiets(e.target.value))
        setCurrentPage(1);
        
    }

    function handleSortName(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleSortHS(e) {
        e.preventDefault();
        dispatch(orderByHS(e.target.value))
        setOrden(`Ordenado ${e.target.value}`)
    }
    if (loader === true) {
        return (
            <div className='main'>
                <div className="buttontopcont">
                    <Link to='/createrecipe'><button >Crear Receta</button></Link>
                    <button className='buttonrecet' onClick={e => { handleCLick(e) }}>
                        Restablecer
                    </button>
                </div>
                <div className='searchbarcontainer'>
                    <SearchBar 
                    paginado={paginado}/>
                </div>
                <div className='filterselects'>
                    <select className='classic' onChange={e => handleSortName(e)}>
                        <option value="">Orden Alfabético</option>
                        <option value="asc">A-Z</option>
                        <option value="desc">Z-A</option>
                    </select>
                    <select className='classic' onChange={e => handleFilterDiets(e)}>
                        <option value="filtrado">Todos los tipos de receta</option>
                        {diets?.map((e) => {
                            return (
                                <option value={e.name} key={e.id}>{e.name}</option>)
                        })}
                    </select>
                    <select className='classic' onChange={e => handleSortHS(e)}>
                        <option value="">Orden por HS</option>
                        <option value="hasc">HS Ascendente</option>
                        <option value="hdesc">HS Descendente</option>
                    </select>
                </div>
                <Paginado className="numspags"
                    currentPage={currentPage}
                    recipesPerPage={recipesPerPage}
                    allRecipes={allRecipes.length}
                    paginado={paginado} />

                <div className='cards'>
                    {currentRecipes?.map(e => {
                        return (
                            <Card id={e.id} name={e.name} image={e.image} diets={e.diets} key={e.id} healthscore={e.healthscore} />
                        )
                    })}

                </div>
                <Paginado className="numspags"
                    currentPage={currentPage}
                    recipesPerPage={recipesPerPage}
                    allRecipes={allRecipes.length}
                    paginado={paginado} />
            </div>
        )
    } else {
        return (
            <Loader />
        )


    }
}