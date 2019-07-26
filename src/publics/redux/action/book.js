import axios from 'axios'

export const getBooks = (keyword) =>{
    return{
        type:"GET_BOOKS",
        payload:axios.get(`http://192.168.6.121:3300/books/?search=${keyword}`)
    }
}

export const getBook = (id) =>{
    return{
        type:"GET_BOOK",
        payload:axios.get(`http://192.168.6.121:3300/books/${id}`)
    }
}

export const postBook = (data) => {
    return{
        type:"POST_BOOK",
        payload:axios.post('http://192.168.6.121:3300/books',data),
    }
}

export const patchBook = (data,id,category) => {
    return{
        type:"PATCH_BOOK",
        payload:axios.patch(`http://192.168.6.121:3300/books/${id}`,{...data,category:category})
    }
}

export const deleteBook = (id) => {
    return{
        type:"DELETE_BOOK",
        payload:axios.delete(`http://192.168.6.121:3300/books/${id}`)
    }
}