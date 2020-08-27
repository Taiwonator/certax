export const getWeather = _ => {
    fetch("http://api.openweathermap.org/data/2.5/weather?q=London&appid=56cc0fdff8c4a41637c27f2d73f85eca", {
        method: 'POST', 
        mode: 'no-cors', 
        headers: {
            'Content-Type': 'application/json', 
        }, 
        body: JSON.stringify({text: 'fluf'})
    })
    .then(response => {
            if(response.status != 200) {
                console.log(`Problem Detected. Status Code: ${response.status}`);
                return;
            } else if (response.ok) {
                return response.json();
            }
    })
    .then(data => console.log(data))

    }
