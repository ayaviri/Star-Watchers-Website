import axios from 'axios';

const tumblrApiKey = '3vD1XHhVpyRQ9EQVcRKBwn1Jv0CG8VQFfjsXXtPxCTGhdxOJqL';

export const getTumblrData = async (searchQuery) => {
  try {
    const apiResponse = await axios.get(`https://api.tumblr.com/v2/tagged?tag=${searchQuery}&api_key=${tumblrApiKey}&limit=1`, {
      headers: {
        'Content-type': 'application/json'
      }
    });
    
    // logs to the url to the top post for this search query
    console.log(apiResponse.data.response[0].post_url);
  } catch (error) {
    console.log(error.message);
  }
};

getTumblrData('fnaf');