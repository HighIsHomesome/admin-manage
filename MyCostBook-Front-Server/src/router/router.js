import App from '../App';
import Login from '../page/login';
import Register from '../page/register';
import Meassage from '../page/message';
import Todo from '../page/todo';
import Home from '../page/home'
import PhoneNumLogin from '../page/PhoneNumLogin'
import Me from '../page/me'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'

const BaseRoute = () =>(
    <Router>
        <Routes>
            <Route path='/' element={<App/>}>
                <Route path='/todo' element={<Todo/>}></Route>
                <Route path='/home' element={<Home/>}></Route>
                <Route path='/message' element={<Meassage/>}></Route>
				<Route path='/me' element={<Me/>}></Route>
            </Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
            <Route path='/phoneNumLogin' element={<PhoneNumLogin/>}></Route>
        </Routes>
    </Router>
)

export default BaseRoute