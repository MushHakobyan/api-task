export default function guest ({ next }){
    if(localStorage.getItem('auth') === 'true'){
        return next({
           name: 'Users'
        })
    }
   
    return next()
}