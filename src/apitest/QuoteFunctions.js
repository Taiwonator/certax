export const hitEndpoint = _ => {
    fetch("https://api.certaxnorwich.accountant/quoteCalculation", {
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
                return response.json();
            }
        })
        .then(data => console.log(data))
}