import React, { useState } from 'react'
import '../components/css/register.css'
import {useNavigate} from 'react-router-dom'

function Register() {

  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [phone, setPhone] = useState('')

  return (
    <div className='register'>


    </div>
  )
}

export default Register