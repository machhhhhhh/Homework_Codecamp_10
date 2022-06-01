import Todolist from '../components/pages/Index'
import Login from '../components/pages/Login'
import Register from '../components/pages/Register'
import Dashboard from '../components/pages/Dashboard'

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
            components.dashboard
        ],
        redirectRoutes : '/dashboard'
    }
}