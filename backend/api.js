/* eslint-disable no-loop-func */
import axios from 'axios';
import * as secrets from './secrets.js';
import util from 'util';


const ERROR_POSTS = [{ name: "API ERROR ⚠: THE API SERVICE USED FOR THIS FEATURE HAS RATE LIMITED US 😢", link: "" }];
var cache = {};

export const getTumblrData = async(searchQuery) => {
    try {
        const name = 'Tumblr';
        const link = 'https://www.tumblr.com/tagged/${searchQuery}?sort=top';
        const posts = await getTumblrPosts(searchQuery);
        return {
            name: name,
            link: link,
            posts: posts,
        };
    } catch (error) {
        console.log(error.message);
        const name = 'Tumblr';
        const link = 'https://www.tumblr.com/tagged/${searchQuery}?sort=top';
        const posts = ERROR_POSTS;
        return {
            name: name,
            link: link,
            posts: posts,
        };
    }
};

const getTumblrPosts = async(searchQuery) => {
    try {
        // a list of description, urls for the top 100 most recent posts
        let topPosts = [];
        // for some reason, setting the sort search query to top returns you the 'recent' posts, so the 100 most recent are sorted by notes
        let apiResponse = await axios.get(`https://api.tumblr.com/v2/tagged?tag=${searchQuery}&api_key=${secrets.TUMBLR_API_KEY}`, {
            headers: {
                'Content-type': 'application/json'
            }
        });

        // posts can only be grabbed 20 at a time, so in order to grab more, several get requests are made
        for (let index = 0; index < 5; index++) {
            if (apiResponse && apiResponse.data && apiResponse.data.response && apiResponse.data.response.length > 0) {
                // find the earliest post
                const posts = apiResponse.data.response;
                const earliestTimestamp = posts[posts.length - 1].timestamp;
                posts.forEach((currentPost) => {
                    topPosts.push({
                        name: currentPost.summary,
                        link: currentPost.post_url,
                        'note_count': currentPost.note_count
                    });
                });
                apiResponse = await axios.get(`https://api.tumblr.com/v2/tagged?tag=${searchQuery}&before=${earliestTimestamp}&api_key=${secrets.TUMBLR_API_KEY}`, {
                    headers: {
                        'Content-type': 'applications/json'
                    }
                });
            } else {
                throw new Error('Could not retrieve posts from Tumblr');
            }
        }

        topPosts = topPosts.sort((postA, postB) => postB['note_count'] - postA['note_count']).slice(0, 5);
        topPosts = topPosts.map(currentPost => {
            return {
                name: currentPost.name,
                link: currentPost.link,
            };
        });
        return topPosts;
    } catch (error) {
        console.log(error.message);
    }
};



export const getRedditData = async(searchQuery) => {
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


export const getYoutubeData = async(searchQuery) => {
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

const getData = async(sq) => {
    let searchQuery = encodeURIComponent(sq);
    if (!(searchQuery in cache)) {
        let tumblr = getTumblrData(searchQuery);
        let reddit = getRedditData(searchQuery);
        let youtube = getYoutubeData(searchQuery);
        [tumblr, reddit, youtube] = await Promise.all([tumblr, reddit, youtube]);
        cache[searchQuery] = {
            sites: [
                tumblr,
                reddit,
                youtube
            ]
        }
    }
    return cache[searchQuery];
}

// Use util to print the whole object
// Uncomment for fullt testing
// console.log(util.inspect(await getData("Cardi B"), false, null, true))



const getTrendingData = async() => {
    var options = {
        method: 'GET',
        url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/TrendingNewsAPI',
        params: { pageNumber: '1', pageSize: '10', withThumbnails: 'false', location: 'us' },
        headers: {
            'x-rapidapi-host': 'contextualwebsearch-websearch-v1.p.rapidapi.com',
            'x-rapidapi-key': '6ba2f742b8msh573bc22a684d3d3p14c007jsn124150752c79'
        }
    };
    try {
        const apiResponse = await axios.request(options);
        const articles = apiResponse.data.value.map(item => {
            return {
                name: item.title,
                link: item.url
            }
        })
        return { "posts": articles };
    } catch (error) {
        console.error(error);
        return { "posts": ERROR_POSTS }
    }
}

console.log(await getTrendingData());