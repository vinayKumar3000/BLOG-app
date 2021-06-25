import { createContext,useReducer ,useEffect} from "react"
import Reducer from "./Reducer"


console.log("Context Out")
const INITIAL_STATE={
    user:JSON.parse(localStorage.getItem("user"))||null,
    isFetching: false,
    err:false,
};

export const Context=createContext(INITIAL_STATE);
export const ContextProvider=({children}) => {
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
    console.log("ContextProvider:"+state.user);
    
    useEffect(() => {
        localStorage.setItem("user",JSON.stringify(state.user));
        
    }, [state.user])
    return (<Context.Provider 
        value={
            {
                user:state.user,
                isFetching:state.isFetching,
                err:state.err,
                dispatch,
            }
        }>
        {children}
        </Context.Provider>);
}