function ajax(url, method, jwt, requestBody) {
    const fetchData = {
        headers: {
            "Content-Type": "application/json"
        },
        method: method
    };

    if(jwt) {
        fetchData.headers.Authorization =  `Bearer ${jwt}`
    }

    if(requestBody) {
        fetchData.body = JSON.stringify(requestBody)
    }

    return fetch(url, fetchData);
}
export default ajax;
