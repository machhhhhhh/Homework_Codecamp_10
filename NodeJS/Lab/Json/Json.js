const fs = require('fs')

let data = fs.readFileSync('./Sample.json')
let json = JSON.parse(data)
let user = json.users

user.map(user => {
    /* 
        This will check every key 
    */
    // for(let key in user){
    //     console.log(user.lastName);
    //     // if(user[key]=='mac'){
    //     //     user[key] = 'Apple'
    //     // }
    // }

    /*
        This will check the target key that we want to manage
    */
    if (user.lastName == 'mac') user.lastName = 'Apple'
})

// console.log(user);

const newData = JSON.stringify(json)
fs.writeFileSync('./output.json', newData)
console.log(json);
