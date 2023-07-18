import axios from "axios";

export const getTextFromGpt = async(inputText) =>{
     const options = {
        method: 'POST',
        url: 'https://chatgpt-api8.p.rapidapi.com/',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'b9e6725bc8msh3970ec5c341e8d0p129524jsn2c0922be4c67',
    'X-RapidAPI-Host': 'chatgpt-api8.p.rapidapi.com'

        },
        data: [
            {
            content: inputText ,
            role: 'user'
            }
        ]
        };
    
        try {
            const response = await axios.request(options);
            console.log(response.data.text);
            return response.data.text;
        } catch (error) {
            console.error(error);
            return null;
        }
}

// 'X-RapidAPI-Key': '92ac622af6msh14700ef39054fefp178d6ajsnad099cccc540',
//             'X-RapidAPI-Host': 'chatgpt-api8.p.rapidapi.com'



