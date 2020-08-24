export const hitEndpoint = _ => {
    fetch("https://2v0ebj4v57.execute-api.eu-west-2.amazonaws.com/quoteCalculation", {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        }, 
        mode: 'no-cors', 
        credentials: 'include'
    })
        .then(response => {
            if(response.status != 200) {
                console.log(`something went wrong. Staus code: ${response.status}`);
                return;
            } else if (response.ok) {
                return response.json();
            }
        })
        .then(data => console.log(data))
}