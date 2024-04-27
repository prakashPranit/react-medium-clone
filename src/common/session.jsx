const storeInSession = (key,value) => {
    sessionStorage.setItem(key,JSON.stringify(value))
}

const lookInSession = (key) => {
    return JSON.parse(sessionStorage.getItem(key))
}

const removeFromSession = (key) => {
    return sessionStorage.removeItem(key)
}

const logOutUser = () => {
    sessionStorage.clear()  
}

export {storeInSession,lookInSession,logOutUser,removeFromSession} 