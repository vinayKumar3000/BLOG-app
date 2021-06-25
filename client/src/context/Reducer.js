console.log("Reducer")
const Reducer =(state,action) =>{
   console.log("Reducer");
    switch(action.type){

        case "LOGIN_START":
            return {
                user:null,
                isFetching:true,
                err:false,
        };
        case "LOGIN_SUCCESS":
            return {
                user:action.payload,
                isFetching:false,
                err:false,
        };
        case "LOGIN_FAILURE":
            return {
                user:null,
                isFetching:false,
                err:true,
        };
        case "LOGOUT":
            return {
                user:null,
                isFetching:false,
                err:false,
        };
        case "UPDATE_START":
            return {
               ...state,isFetching:true,
        };
        case "UPDATE_SUCCESS":
            return {
               user:action.payload,
               isFetching:false,
               err:false,
        };
        case "UPDATE_FAILURE":
            return {
                user:state.user,
                err:true,
                isFetching:false,
        };
        default:
            return state;
            

    }

};

export default Reducer;