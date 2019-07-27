import axios from 'axios'

export const getPinjams = (token,idUser) =>{
console.log(idUser)
    return{
        type:"GET_PINJAMS",
        payload:axios.post(`http://192.168.6.121:3300/pinjam/`,{id:localStorage.id,role:localStorage.role},{
            headers:{
                "x-access-token":`bearer ${localStorage.token}`,
                "authorization":"Allow",
                "x-control-user": localStorage.id
            }
        })
    }
}

export const getPinjam = (id,token,idUser) =>{
    return{
        type:"GET_PINJAM",
        payload:axios.get(`http://192.168.6.121:3300/pinjam/${id}`,null,{
            headers:{
                "x-access-token":`bearer ${localStorage.token}`,
                "authorization":"Allow",
                "x-control-user": localStorage.id
            }
        })
    }
}

export const postPinjam = (data,token,idUser) => {
    return{
        type:"POST_PINJAM",
        payload:axios.post('http://192.168.6.121:3300/pinjam',data,{
            headers:{
                "x-access-token":`bearer ${localStorage.token}`,
                "authorization":"Allow",
                "x-control-user": localStorage.id
            }
        }),
    }
}

export const patchPinjam = (data,id,token,idUser) => {
    return{
        type:"PATCH_PINJAM",
        payload:axios.patch(`http://192.168.6.121:3300/pinjam/${id}`,data,{
            headers:{
                "x-access-token":`bearer ${localStorage.token}`,
                "authorization":"Allow",
                "x-control-user": localStorage.id
            }
        })
    }
}