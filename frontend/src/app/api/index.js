const baseUrl = `${process.env.REACT_APP_BACKEND}`;
const getOptions = {
    headers: {'Authorization': '*'}
};
const deleteOptions = {
    headers: {'Authorization': '*'},
    method: 'DELETE'
};
const putOptions = {
    method: 'PUT',
    headers: {
        'Authorization': '*',
        'Content-Type': 'application/json'
    }
};
const postOptions = body => {
    return {
        headers: {
            'Authorization': '*',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(body)
    }
};

export function fetchElements(path) {
    const url = `${baseUrl + path}`;
    return fetch(url,getOptions)
        .then(
            res => {return res.json()},
            error => {console.error(error)}
        )
}

export function postActions(path,body) {
    const url = `${baseUrl + path}`;
    return fetch(url,postOptions(body))
        .then(
            res => {return res.json()},
            error => {console.error(error)}
        )
}

export function deleteElements(path) {
    const url = `${baseUrl + path}`;
    return fetch(url,deleteOptions)
        .then(
            res => {return res.json()},
            error => {console.error(error)}
        )
}

export function editElements(path) {
    const url = `${baseUrl + path}`;
    return fetch(url,putOptions)
        .then(
            res => {return res.json()},
            error => {console.error(error)}
        )
}