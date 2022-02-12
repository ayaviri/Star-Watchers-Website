import axios from 'axios';
import * as secrets from './secrets.js';


const ERROR_POSTS = [{ name: "API ERROR - NO CREDS LEFT", link: "" }];

export const getTumblrData = async(searchQuery) => {
    try {
        const apiResponse = await axios.get(`https://api.tumblr.com/v2/tagged?tag=${searchQuery}&api_key=${secrets.TUMBLR_API_KEY}&limit=1`, {
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


export const getRedditPosts = async(searchQuery) => {
    let formatted = {
        "name": "reddit",
        "link": `https://www.reddit.com/search/?q=${searchQuery}`,
    }
    try {
        const apiResponse = await axios.get(`https://www.reddit.com/search.json?q=${searchQuery}&limit=5`, {
            headers: {
                'Content-type': 'application/json'
            }
        });
        const posts = apiResponse.data.data.children.map((x) => {
            return {
                "title": x.data.title,
                "img": x.data.url,
                "link": `https://www.reddit.com/${x.data.permalink}`
            }
        });

        formatted["posts"] = posts;
        return formatted;
    } catch (error) {
        formatted["posts"] = ERROR_POSTS;
        console.log(error.message);
    }

    return formatted;
}


export const getYoutubePosts = async(searchQuery) => {
    let formatted = {
        "name": "YouTube",
        "link": `https://www.youtube.com/results?search_query=${searchQuery}`,
    }

    try {
        const key = 'AIzaSyB1hO0JkccSV-yB_b_C207mq_Zm75Gx494';
        const apiResponse = await axios.get(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&maxResults=5&key=${key}`, {
                headers: {
                    'Content-type': 'application/json',
                }
            });
        formatted["posts"] = apiResponse.data.items.map((item) => {
            return {
                link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
                name: item.snippet.title
            }
        })

    } catch (error) {
        console.log(error.message);
        formatted["posts"] = ERROR_POSTS;
    }

    return formatted;
}