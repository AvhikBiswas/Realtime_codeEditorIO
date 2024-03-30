const axios = require("axios");

async function compile(value, inputValue) {
  const Api_key = process.env.COMPILER_API_kEY;
  const options = {
    method: "POST",
    url: "https://online-code-compiler.p.rapidapi.com/v1/",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": Api_key,
      "X-RapidAPI-Host": "online-code-compiler.p.rapidapi.com",
    },
    data: {
      language: "cpp",
      version: "latest",
      code: value,
      input: inputValue,
    },
  };
  if (value === "") {
    console.log("value--->", value);
    return "no value found";
  }
  // Call the compiler function with the provided options
  return compiler(options);
}

async function compiler(options) {
  try {
    const response = await axios.request(options);
    console.log("response", response.data);
    return response.data.output;
  } catch (error) {
    throw error.data;
  }
}

module.exports = { compile };
