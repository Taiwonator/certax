import 'regenerator-runtime/runtime';

export const hitEndpoint = _ => {
    fetch("https://api.certaxnorwich.accountant/postQuote", {
        method: 'POST', 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, 
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



// export const getABatch = (answers, questions, batch) => {
//     let jsonObject = {answers: convertObject(answers, questions), batch}
//     const data = fetch("https://api.certaxnorwich.accountant/postQuote", {
//         method: 'POST', 
//         headers: {
//             'Content-Type': 'application/json'
//         }, 
//         credentials: 'include',
//         body: JSON.stringify(jsonObject)
//     })
//         .then(response => {
//             if(response.ok) {
//                 return response.json();
//             }
//         })
//         .then(data => {
//             console.log("Batch Data:", data);
//             return data;
//         })
//         .catch(error => console.log("Error: ", error))
//     return data;
// }

export async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        }, 
        credentials: 'include',
        body: JSON.stringify(data)
    });
    return response.json();
}

export const getABatch = async (answers, questions, batch, quote) => {
    let jsonObject = {};
    if(quote) {
        jsonObject = {answers: convertObject(answers, questions), batch, quote}
    } else {
        jsonObject = {answers: convertObject(answers, questions), batch}
    }
    console.log("JSON Object being sent", jsonObject);
    return await postData("https://api.certaxnorwich.accountant/postQuote", jsonObject)
    .then(data => {
        console.log(data);
        return data;
    })
}

const convertObject = (answers, questions) => {
    let answers_array = {};
    if(Object.keys(answers).length === 0 && answers.constructor === Object) {
        
    } else {
        const answer_keys = Object.keys(answers).map((key) => {
            answers_array[key] = {
                                    'questionKey': key, 
                                    'answer': answers[key]
                                }
        })
    }
    return answers_array;
}

// const getQuestionFromKey = (questions, key) => {
//     let questions_array = [];
//     for(var i = 0; i < questions.length; i++) {
//         for(var j = 0; j < questions[i].length; j++) {
//             let question = questions[i][j];
//             if(!questions_array.includes(question)) {
//                 questions_array.push(question);
//             }
//         }
//     }
//     let displayValue = '';
//     const questions_keys = questions_array.map((question) => {
//         if(question.key == key) {
//            displayValue = question.displayValue;
//         }
//     })
//     return displayValue;
// }


