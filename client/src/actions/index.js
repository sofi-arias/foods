import axios from 'axios';

export function getRecipes(){
    return async function (dispatch){
        var json = await axios.get("https://pifoodback-production-a96f.up.railway.app/recipes",{});
        return dispatch({
            type:'GET_RECIPES',
            payload: json.data
        })
    }
}