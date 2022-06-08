import Todolist from '../components/pages/Index'
import Login from '../components/pages/Login'
import Register from '../components/pages/Register'
import Dashboard from '../components/pages/Dashboard'
import Friend from '../components/pages/Friend'
// import FacebookLogin from '../components/pages/FacebookLogin'

const components = {
    todo : {
        url : '/list',
        component : Todolist
    },
    login : {
        url : '/login',
        component : Login
    },
    register : {
        url : '/register',
        component : Register
    },
    dashboard : {
        url : '/dashboard',
        component : Dashboard
    },
    friend : {
        url : '/friend',
        component : Friend
    }
}

// Role ไหนเข้าหน้าไหนได้บ้าง
export default {
    guest : {
        allowRoutes : [
            components.login,
            components.register
        ],
        redirectRoutes : '/login'
    },
    user : {
        allowRoutes : [
            components.todo,
            components.dashboard,
            components.friend
        ],
        redirectRoutes : '/dashboard'
    }
}