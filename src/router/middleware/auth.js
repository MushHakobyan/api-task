export default function auth ({ next }){
    if(localStorage.getItem('auth') !== 'true'){
        return next({
           name: 'Login'
        })
    }
   
    return next()
}