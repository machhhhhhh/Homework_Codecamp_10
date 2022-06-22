// import Index from '../page/Index'
// import Login from '../page/Login'
// import Register from '../page/Register'
// import Home from '../page/home'

// const components = {
//     login : {
//         url : '/',
//         component : <Login/>
//     },
//     register : {
//         url : '/register',
//         component : Register
//     },
//     customer : {
//         url : '/index',
//         component : Index
//     },
//     shop : {
//         url : '/home',
//         component : Home
//     }

// }

// // Role ไหนเข้าหน้าไหนได้บ้าง
// export default {
//     guest : {
//         allowRoutes : [
//             components.login,
//             components.register
//         ],
//         redirectRoutes : '/login'
//     },
//     customer : {
//         allowRoutes : [
//             components.customer,
//         ],
//         redirectRoutes : '/index'
//     },
//     shop : {
//         allowRoutes : [
//             components.shop,
//         ],
//         redirectRoutes : '/home'
//     }
// }