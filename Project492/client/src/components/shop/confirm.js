// import React , {useState, useEffect} from 'react'
// import {useNavigate, useLocation} from 'react-router-dom'
// import io from 'socket.io-client'
// import Header from '../customer/components/Header'
// import axios from '../../config/axios'

// const socket = io.connect('http://localhost:5000', {
//     transports : ['websocket'], 
//     withCredentials: true,
//     extraHeaders: {
//     "my-custom-header": "abcd"
//     }})


// export default function Confirm({setCheck}) {

//     const navigate = useNavigate()
//     const location = useLocation()
//     const order = location.state.order


//     const accept = async(e)=>{
//         try {
//             e.preventDefault()
//             const check  = window.confirm('Accept ?!!')
//             if(!check){
                
//                 return ;
//             }

//             await axios.put(`/order/${order.id}`)

//             const data = {
//                 order_id : order.id,
//                 accept : true
//             }
//             setCheck(false)

//             await socket.emit('matching-user', order.id)
//             await socket.emit('accept-order', order.id)

//             return navigate('/shop-waiting', {state : {order : order}})

//         } catch (error) {
//             console.error(error)
//         }
//     }


//     const reject = async(e)=>{
//         try {
//             e.preventDefault()
//             const check  = window.confirm('Reject ?!!')
//             if(!check){
                
//                 return ;
//             }
//             setCheck(false)
//             const data = {
//                 order_id : order.id,
//                 accept : false
//             }

//             await socket.emit('accept-order', data)

//             return navigate('/home')
            
//         } catch (error) {
//             console.error(error)
//         }
//     }

//     const map = async(e) => {
//         try {
//             e.preventDefault()

//             // return navigate('map')

//         } catch (error) {
            
//         }
//     }

//   return (
//     <div className='shop-confirm'>
//         <Header />

//         {order && (
//             <div className='shop-order'>
//                     <div className=' shop-order-title'>
//                         <h1>Problem : </h1>
//                         <h1>{order.problem}</h1>
//                     </div>
//                     <div className=' shop-order-title'>
//                         <h1>Brand : </h1>
//                         <h1>{order.brand}</h1>
//                     </div>
//                     <div className=' shop-order-title'>
//                         <h1>Model : </h1>
//                         <h1>{order.model}</h1>
//                     </div>
                    
//                     {order.description && (
//                         <div className='shop-order-description'>
//                             <p>{order.description}</p>
//                         </div>
//                     )}

//                     {order.Ophotos.length!==0 && (
//                         <div className='shop-order-photo'>
//                             {order.Ophotos.map(photo => (
//                                 <img 
//                                     src={photo}
//                                     alt='order'
//                                 />
//                             ))}
//                         </div>
//                     )}

//                     <button type='button' onClick={(e)=>map(e)}><strong>Map</strong></button>

//                     <div className='shop-order-button'>
//                         <button type='submit' onClick={e=>accept(e)} ><strong>Accept</strong></button>
//                         <button type='button' onClick={(e => reject(e))} ><strong>Reject</strong></button>
//                     </div>
//             </div>
//         )}
//     </div>
//   )
// }
