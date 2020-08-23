export const getWeather = _ => {
    fetch("http://api.openweathermap.org/data/2.5/weather?q=London&appid=56cc0fdff8c4a41637c27f2d73f85eca")
        .then(response => {
            if(response.status != 200) {
                console.log(`Problem Detected. Status Code: ${response.status}`);
                return;
            }

            // response.json().then(data => {
            //     console.log(data);
            // })
            response.json().then(data => console.log(data));
        })
    }
