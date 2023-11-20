import {myAxios, privateAxios} from './helper';

export const loadAllCategories=()=>{
    return myAxios.get(`/categories/`).then(respone=>{return respone.data})
}

export function loasPostUserWise(userId){
    return privateAxios.get(`/user.${userId}/posts`).then(respone=>{return respone.data})
}