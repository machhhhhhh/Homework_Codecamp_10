import React, { useEffect, useState } from 'react'
import {Route, Routes, useNavigate, useLocation} from 'react-router-dom'
import LocalStorageService from '../service/LocalStorageService'
import axios from '../config/axios'

import Index from '../page/Index'
import Login from '../page/Login'
import Register from '../page/Register'
import Home from '../page/home'

import CustomerProfile from '../components/customer/page/profile'
import CustomerHistory from '../components/customer/page/history'
import CustomerHistoryDetail from '../components/customer/page/historyDetail'
import CustomerReport from '../components/customer/page/report'
import CustomerInvoice from '../components/customer/page/invoice'
import CustomerOrder from '../components/customer/page/order'
import CustomerMap from '../components/customer/page/map'
import CustomerOrderWaiting from '../components/customer/page/waiting'
import CustomerShow from '../components/customer/page/show'
import CustomerDecide from '../components/customer/page/decide'

import ShopHistory from '../components/shop/history'
import ShopProfile from '../components/shop/profile'
import ShopHistoryDetail from '../components/shop/historyDetail'
import ShopServiceCall from '../components/shop/serviceCall'
// import ShopConfirm from '../components/shop/confirm'
import ShopWaiting from '../components/shop/waiting'
import ShopShow from '../components/shop/show'

function PrivateRoute() {

    const shopRoutes = [
        '/home',
        '/shop-profile',
        '/shop-history',
        '/shop-history-detail',
        '/shop-service-call',
        '/shop-waiting',
        '/shop-show'
]

    // const role = props.role || 'guest' 
    const [role, setRole] = useState(LocalStorageService.getToken() ? null : 'guest' )
    const [user, setUser] = useState(null)
    const [isHaveOrder, setCheck] = useState(false)

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(()=>{

        if(location.pathname!=='/login' || LocalStorageService.getToken()) fetchUser()

    },[])


    useEffect(()=>{

        // console.log('check check');

        if(role === 'guest') navigate('/login')
        // if(role!=='guest') fetchUser().then(()=>{
        //     console.log('user',user)
        // }).then(()=>{
            if(role === 'customer') {
                navigate('/index')
            }
            // if(role==='shop') navigate('/home')
            // if(role === 'shop' &&  location.pathname ==='/login' ) {
            //     navigate('/home')
            // }

            
            // if(role === 'shop' && shopRoutes.includes(location.pathname)){
                
            //     navigate(location.pathname)
            // }

            if (role==='shop') navigate('/home')
        // })
        // console.log(user);
        


    },[role])

    const fetchUser = async () => {

        try {
            
            const result = await axios.get('/user')
            // console.log(result.data);
            setUser({...result.data})
            setRole(result.data.role)
            // setUser(result.data) 
            // console.log(result.data)
            
        } catch (error) {
            console.error(error)
        }
    
    }


    const setOrder = (content) => {
        setCheck(content)
    }


    const logout = async() => {
        setRole('guest')
        LocalStorageService.removeToken()
        return navigate('/login')
      }


  return (
    <Routes>


        {role==='guest' && (
            <>
                <Route path='/login' element={<Login reload = {fetchUser} setRole ={setRole}  /> }  exact />
                <Route path='/register' element={<Register/>}  exact/>
                
            </>
        )}

        {role ==='customer' && (
            <>
                <Route path='/index' element={<Index user = {user} reload = {fetchUser}  />} exact/>
                <Route path='/customer-profile' element={<CustomerProfile  logout = {logout} reload = {fetchUser} user = {user} />} exact/>
                <Route path='/customer-history' element={<CustomerHistory   />} exact/>
                <Route path='/customer-history-detail' element={<CustomerHistoryDetail  />} exact/>
                <Route path='/customer-report' element={<CustomerReport  />} exact/>
                <Route path='/customer-invoice' element={<CustomerInvoice  />} exact/>

                <Route path='/customer-map' element={<CustomerMap  />} exact/>
                <Route path='/order' element={<CustomerOrder reload = {fetchUser} />} exact/>
                <Route path='/order-waiting' element={<CustomerOrderWaiting  />} exact/>
                <Route path='/customer-decide' element={<CustomerDecide  />} exact/>
                <Route path='/customer-show' element={<CustomerShow  />} exact/>
            </>
        )}


        {role ==='shop' && (
            <>
                <Route path='/home' element={<Home user = {user} reload={fetchUser} check={isHaveOrder} />} exact />
                <Route path='/shop-profile' element={<ShopProfile logout = {logout} user = {user} reload = {fetchUser} />} exact />
                <Route path='/shop-history' element={<ShopHistory  />} exact />
                <Route path='/shop-history-detail' element={<ShopHistoryDetail  />} exact />
                
                <Route path='/shop-service-call' element={<ShopServiceCall setCheck = {setOrder}  />} exact />
                {/* <Route path='/shop-confirm' element={<ShopConfirm  setCheck = {setOrder} />} exact /> */}
                <Route path='/shop-waiting' element={<ShopWaiting  />} exact />
                <Route path='/shop-show' element={<ShopShow  />} exact />
            </>
        )}


    </Routes>
  )
  
}

export default PrivateRoute