export const hitEndpoint = _ => {
    fetch("https://api.certaxnorwich.accountant/postQuote", {
        method: 'POST', 
        headers: new Headers({
            'accept': 'application/json',
            'content-type': 'application/json'
        }), 
        mode: 'no-cors', 
        credentials: 'include',
        body: JSON.stringify({answers: {}, batch: 0})
    })
        .then(response => {
            console.log(response);
            if(response.ok) {
                return response.json();
            }
        })
        .then(data => console.log(data))
}

