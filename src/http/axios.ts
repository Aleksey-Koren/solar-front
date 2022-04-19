import axios from "axios";

export const axiosApi = axios.create({baseURL: 'http://localhost:8081/api/'});

axiosApi.interceptors.request.use(request => {
    if (!['login', 'register'].includes(request.url)) {
        //todo: paste token
    }
    console.log('REQUEST INTERCEPTOR.' + request)

    return request;
}, (error) => {
    console.log('REQUEST ERROR');
})

axiosApi.interceptors.response.use(response => {
        console.log('RESPONSE INTERCEPTOR. ' + response)
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 403) {
            window.location.href = '/login'
        }

        console.log('RESPONSE ERROR. ' + error)

        return Promise.reject(error);
    }
)