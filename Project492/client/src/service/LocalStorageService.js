import jwtDecode from 'jwt-decode'

function setToken(token) {
    localStorage.setItem('ACCESS_TOKEN', token)
}

function getToken(){
    return localStorage.getItem('ACCESS_TOKEN')
}

function removeToken(){
    localStorage.removeItem('ACCESS_TOKEN')
}

function getRole() {
    if (getToken()){
        // return 'user'
        const checkShop = jwtDecode(getToken())
        if(checkShop.shopname){
            return 'shop'
        }
        else {
            return 'customer'
        }
    }
        return 'guest'
}

export default {
    setToken,
    getToken,
    getRole,
    removeToken
}