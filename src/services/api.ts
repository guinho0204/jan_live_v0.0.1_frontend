import axios from "axios";


const axiosApi = axios.create({
    baseURL:'http://192.168.15.188:5030'
})

export{axiosApi}