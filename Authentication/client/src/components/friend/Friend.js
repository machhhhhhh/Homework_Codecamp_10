import React , {useState, useEffect}from 'react'
import '../css/friend/feed.css'
import FriendForm from './FriendForm'
import axios from '../../config/axios'
import LocalStorageservice from '../../services/localStorageservice'
import jwtDecode from 'jwt-decode'

function Friend() {

    const [friend_ac, setFriendAc] = useState([])
    const [friend_rq, setFriendRq] = useState([])
    const [accept, setAccept] = useState([])
    const [request, setRequest] = useState([])

    // const [friend, setFriend] = useState([])
    // const [user, setUser] = useState([])
    const [currentUser, setCurrentUser] = useState([])

    const fetchFriend = async() => {
        try {

            const friend_accept = await axios.get('/friend?status=ACCEPTED')
            const friend_request = await axios.get('friend?status=REQUESTED')
            // const friend = await axios.get('/friend')
            // console.log(friend.data.friend);

            // console.log(friend_request.data);

            // friend.data.friend.map(user=>{
            //     console.log(user);
            // })
            // friend.data.friend.map(user=>{
            //     console.log(user);
            // })
            // setUser(friend.data.user)
            // setFriend(friend.data.friend)

        // getUser()
        // const userLogin = jwtDecode(token)
        // console.log(user);
        // setUser(userLogin)
        // console.log(user);
        // console.log(jwtDecode(token));
        
        const token = LocalStorageservice.getToken()
        const result = await axios.get('/user')
        const data = result.data
        const profile = data.filter(user => user.id === jwtDecode(token).id)
        profile.map(user => {
            // console.log(user);
             setCurrentUser(user)
        })

        



            setAccept(friend_accept.data.user)
            setRequest(friend_request.data.user)
            setFriendAc(friend_accept.data.friend)
            setFriendRq(friend_request.data.friend)

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(()=>{
        fetchFriend()
    },[])

  return (
    <div className='friend-feed'>
        <div className='friend-feed-header'>
            <h3>Friend</h3>
            <h4>See all</h4>
        </div>
        <div className='friend-feed-detail'>

            {/* {user && user.map(user => (
                <FriendForm
                    currentUser = {currentUser}
                    user = {user}  
                    friends = {friend}
                />
            ))} */}

            {accept.map(friend => (
                <FriendForm 
                    key={friend.id}
                    currentUser={currentUser}
                    friend = {friend}
                    isFriend = {true}
                    reload = {fetchFriend}
                />
            ))}
            {request.map(friend => (
                <FriendForm 
                    key={friend.id}
                    currentUser={currentUser}
                    friend = {friend}
                    isFriend = {false}
                    reload = {fetchFriend}
                />
            ))}
        </div>
    </div>
  )
}

export default Friend