export const hitEndpoint = _ => {
    fetch("https://api.certaxnorwich.accountant/postQuote", {
        method: 'POST', 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, 
        mode: 'no-cors', 
        credentials: 'include', 
        body: JSON.stringify({answers: {}, batch: 0})
    })
        .then(response => {
            if(response.ok) {
                console.log(response);
                return response.json();
            }
        })
        .then(data => console.log(data))
}

