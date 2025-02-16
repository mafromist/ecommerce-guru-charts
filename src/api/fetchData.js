import axios from 'axios'

const fetchData = axios.create({
    baseURL: 'https://iapitest.eva.guru/',
    headers: {
        'Content-Type': 'application/json',
    },
})

fetchData.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        } else {
            console.warn('[FetchData] No token found in localStorage')
        }
        return config
    }, (error) => {
        if (error.response) {
            console.warn(`[FetchData] ${error.response.status} ${error.response.statusText}`)
        }
        return Promise.reject(error)
    }
)
export default fetchData
