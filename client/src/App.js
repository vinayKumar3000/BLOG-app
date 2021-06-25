import React from 'react'
import Topbar from './components/topbar/Topbar'
import Home from './pages/home/Home'
import Write from './pages/write/Write'
import Login from './pages/login/Login'
import Single from './pages/single/Single'
import Settings from './pages/settings/Settings'
import Register from './pages/register/Register';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import {useContext} from 'react'
import {Context} from './context/Context'



function App() {
    
    const {user} = useContext(Context)
    
    console.log("app Out:"+user);
    return (
    <Router>
    
        <Topbar/>
        <Switch>
        <Route path="/" exact={true}>
            <Home/>
              
        </Route>
         
       
        <Route path="/post/:postId" >
        <Single/>
              
        </Route>
        <Route path="/register" >
           {user? <Home/>: <Register/>}
              
        </Route>
        <Route path="/Login" >
          {user? <Home/>: <Login/>}
              
        </Route>
        <Route path="/settings" >
            {user? <Settings/>: <Register/>}
              
    
        </Route>
        <Route path="/write" >
        {user? <Write/>: <Register/>}
              
        </Route>
       
          
        </Switch> 
        
        
    </Router>
    )
}

export default App
