//isLoggedIn

export const isLoggedIn=()=>{
   let data = localStorage.getItem("data")
   if(data != null){
     return true;
   }
   else{
     return false;
   }
}



// doLogin=> data=>set to LS

export const  doLogin=(data,next)=>{
    localStorage.setItem("data",JSON.stringify(data));
    next()
}

//doLogout=> remove from LS

export const doLogout=(next)=>{
    localStorage.removeItem("data");
    next()
}

//get CurrentUser

export const getCurrentUserDetails=()=>{
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem("data"))?.user;
    }else{
        return undefined;
    }
}

//get token;

export const getToken=()=>{
   
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem("data")).token;
    }
    else{
        return undefined;
    }

}