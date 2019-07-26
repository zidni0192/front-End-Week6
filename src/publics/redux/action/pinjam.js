import axios from 'axios'

export const getPinjams = (token,idUser) =>{
    return{
        type:"GET_PINJAMS",
        payload:axios.get(`http://192.168.6.121:3300/pinjam/`,null,{
            headers:{
                "x-access-token":`bearer ${token}`,
                "authorization":"Allow",
                "x-control-user": idUser
            }
        })
    }
}

export const getPinjam = (id) =>{
    return{
        type:"GET_PINJAM",
        payload:axios.get(`http://192.168.6.121:3300/pinjam/${id}`)
    }
}

export const postPinjam = (data,token,idUser) => {
    return{
        type:"POST_PINJAM",
        payload:axios.post('http://192.168.6.121:3300/pinjam',data,{
            headers:{
                "x-access-token":`bearer ${token}`,
                "authorization":"Allow",
                "x-control-user": idUser
            }
        }),
    }
}

export const patchPinjam = (data,id,token,idUser) => {
    return{
        type:"PATCH_PINJAM",
        payload:axios.patch(`http://192.168.6.121:3300/pinjam/${id}`,data,{
            headers:{
                "x-access-token":`bearer ${token}`,
                "authorization":"Allow",
                "x-control-user": idUser
            }
        })
    }
}