import React , {useState} from 'react'
import {Button, Input} from 'antd'
import '../App.css'

function Todolist() {
    

    const [text, setText] = useState('')
    const [list, setList] = useState([])
    const [done, setDone] = useState([])
    const [check, setCheck] = useState(false)
    const [change, setChange] = useState('')

    // this algorithm not support for same words
    const finish = index =>{
        // const data = ([...list].splice(index,1));
        // setList(data)
        // const data = [...list].filter(item => item !== todo)
        // const move = [...list].filter(item => item === todo)
        // setList(data)
        
        // if(move.length > 1){
        //   setDone([move[0],...done])
        // } 
        // else {
        //   setDone([move,...done])
        // }

        const data = [...list]
        const move = data.splice(index,1)
        setDone([move,...done])
        setList(data)

    }
    const edit = (index) => {
        // const todo = list.filter(index => console.log(index))
        // console.log(list[index]);

        if (check){
            list[index] = change
        }
        setChange('')
        setCheck(false)
    }

    const add = () => {
        if (text) 
        setList([...list, text])
        setText("")
        // console.log(list.length);
    }

    const del = index => {
        // const data = [...list].filter(list => list !== item)
        // setList(data)
        // list.splice(index,1)
        const data = [...list]
        data.splice(index,1)
        setList(data)
    }

        return (
            <div className='list'>

                <h1>Todo App</h1>
        
                <Input placeholder='Enter list' value= {text} style={{width:300}} onChange={ e => setText(e.target.value)}/> 
                <Button type='primary' onClick={add} >Submit</Button>


        <div className='item'>
            <h1>Lists</h1>
            {list.map((item,key) => 
            <li key={key} >
                {check===false? 
                (
                    <>
                        {item}  
                        <Button type='primary'  onClick={() => setCheck(true)}>Edit</Button>
                    </>
                )
                    : 
                    (
                    <>
                        <Input className='check' placeholder={item} value ={change} onChange = { e => setChange(e.target.value)}/>
                        <Button type='primary'  onClick={() => edit(key)}>Save</Button>
                    </>
                    )
                }
                
                        <Button type='primary' danger  onClick={() => del(key)}>Delete</Button>
            </li>
            )}
        </div>

        </div>
    )
}

export default Todolist