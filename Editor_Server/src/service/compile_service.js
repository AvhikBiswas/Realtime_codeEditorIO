import axios from 'axios';

const options = {
    method: 'POST',
    url: 'https://online-code-compiler.p.rapidapi.com/v1/',
    headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'd7a3112707msh80b8b62cf212f3bp1b8169jsnc3b23a741b018798224802',
        'X-RapidAPI-Host': 'online-code-compiler.p.rapidapi.com'
    },

    // acording to language now we will compile cpp so we change acording to that but we can add more language

    data: {
        language: 'python3',
        version: 'latest',
        code: 'print("Hello, World!");',   // we will get code from the RTK state and we will work on that
        input: null                        // we can use it acordingley 
    }
};


const compiler = async(options) => {
    try {
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}
