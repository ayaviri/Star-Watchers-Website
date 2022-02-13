import axios from 'axios';
import * as secrets from './secrets.js';
import * as StringUtils from './string-utils.js';
import googleTrends from 'google-trends-api';
import express from 'express';

const ERROR_POSTS = [{ name: "API ERROR ⚠: THE API SERVICE USED FOR THIS FEATURE HAS RATE LIMITED US 😢", link: "" }];
var cache = {};

export const getGeniusData = async(searchQuery) => {
    const name = 'Genius';
    const link = `https://genius.com/search?q=${StringUtils.encodeSpaceIntoQuery(searchQuery)}`;
    try {
        return {
            name: name,
            link: link,
            posts: await getGeniusHits(searchQuery),
        };
    } catch (error) {
        console.log(error.message);
        return {
            name: name,
            link: link,
            posts: ERROR_POSTS,
        };
    }
};

const getGeniusHits = async(searchQuery) => {
    try {
        const apiResponse = await axios.get(`https://api.genius.com/search?q=${StringUtils.encodeSpaceIntoQuery(searchQuery)}`, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${secrets.GENIUS_CLIENT_ACCESS_TOKEN}`
            }
        });

        if (apiResponse && apiResponse.data && apiResponse.data.response && apiResponse.data.response.hits && apiResponse.data.response.hits.length > 0) {
            let hits = apiResponse.data.response.hits;
            hits.sort((hitA, hitB) => {
                return hitB.result.pyongs_count - hitA.result.pyongs_count;
            });
            hits = hits.map((currentHit) => {
                return {
                    name: currentHit.result.full_title,
                    link: currentHit.result.url,
                };
            });
            return hits.slice(0, 5);
        } else {
            throw new Error('Could not retrieve hits from Genius');
        }
    } catch (error) {

    }
};

export const getTwitterData = async(searchQuery) => {
    const name = 'Twitter';
    const link = `https://twitter.com/search?lang=en&q=(%23${StringUtils.encodeSpaceIntoQuery(searchQuery)})&src=typed_query`
    try {
        return {
            name: name,
            link: link,
            posts: await getTwitterPosts(searchQuery),
        };
    } catch (error) {
        console.log(error.message);
        return {
            name: name,
            link: link,
            posts: ERROR_POSTS,
        };
    }
};

const getTwitterPosts = async(searchQuery) => {
    try {
        const posts = [];
        const apiResponse = await axios.get(`https://api.twitter.com/2/tweets/search/recent?query=${StringUtils.encodeSpaceIntoQuery(searchQuery)}&sort_order=relevancy`, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${secrets.TWITTER_BEARER_TOKEN}`
            }
        });

        if (apiResponse && apiResponse.data && apiResponse.data.data && apiResponse.data.data.length > 0) {
            apiResponse.data.data.forEach((currentPost) => {
                const textAsList = currentPost.text.split(' ');
                const post_url = textAsList.pop();
                const text = textAsList.join(' ');
                posts.push({
                    name: text,
                    link: post_url,
                });
            });

            return posts;
        } else {
            throw new Error('Could not retrieve posts from Twitter');
        }
    } catch (error) {
        console.log(error.message);
    }
};

export const getTumblrData = async(searchQuery) => {
    const name = 'Tumblr';
    const link = `https://www.tumblr.com/tagged/${StringUtils.encodeSpaceIntoQuery(searchQuery)}?sort=top`;
    try {
        return {
            name: name,
            link: link,
            posts: await getTumblrPosts(searchQuery),
        };
    } catch (error) {
        console.log(error.message);
        return {
            name: name,
            link: link,
            posts: ERROR_POSTS,
        };
    }
};

const getTumblrPosts = async(searchQuery) => {
    try {
        // a list of description, urls for the top 100 most recent posts
        let topPosts = [];
        // for some reason, setting the sort search query to top returns you the 'recent' posts, so the 100 most recent are sorted by notes
        let apiResponse = await axios.get(`https://api.tumblr.com/v2/tagged?tag=${StringUtils.encodeSpaceIntoQuery(searchQuery)}&api_key=${secrets.TUMBLR_API_KEY}`, {
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
                apiResponse = await axios.get(`https://api.tumblr.com/v2/tagged?tag=${StringUtils.encodeSpaceIntoQuery(searchQuery)}&before=${earliestTimestamp}&api_key=${secrets.TUMBLR_API_KEY}`, {
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
        "name": "Reddit",
        "link": `https://www.reddit.com/search/?q=${StringUtils.encodeSpaceIntoQuery(searchQuery)}`,
    }
    try {
        const apiResponse = await axios.get(`https://www.reddit.com/search.json?q=${StringUtils.encodeSpaceIntoQuery(searchQuery)}&limit=5`, {
            headers: {
                'Content-type': 'application/json'
            }
        });
        const posts = apiResponse.data.data.children.map((x) => {
            return {
                "name": x.data.title,
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
        "link": `https://www.youtube.com/results?search_query=${StringUtils.encodeSpaceIntoQuery(searchQuery)}`,
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
                name: item.snippet.title,
                link: `https://www.youtube.com/watch?v=${item.id.videoId}`
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
        let genius = getGeniusData(searchQuery);
        let twitter = getTwitterData(searchQuery);
        [tumblr, reddit, youtube, genius, twitter] = await Promise.all([tumblr, reddit, youtube, genius, twitter]);
        cache[searchQuery] = {
            sites: [
                tumblr,
                reddit,
                youtube,
                genius,
                twitter
            ]
        }
    }
    return cache[searchQuery];
}

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

// Use util to print the whole object
// Uncomment for fullt testing
// console.log(util.inspect(await getData("fnaf"), false, null, true))


const getGoogleTrends = async(searchQuery) => {
    let yearAgo = new Date()
    yearAgo.setFullYear(yearAgo.getFullYear() - 1);
    const trend = googleTrends.interestOverTime({
            keyword: searchQuery,
            startTime: yearAgo
        }).then(function(results) {
            results = JSON.parse(results);
            const points = results.default.timelineData.map((point) => {
                return {
                    time: point.time,
                    formattedTime: point.formattedTime,
                    formattedAxisTime: point.formattedAxisTime,
                    value: point.hasData[0] ? point.value[0] : 0,
                }
            })
            console.log(points); //Object.keys(results));
        })
        .catch(function(err) {
            console.error('Oh no there was an error', err);
        })
}

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/search/googleTrends', (req, res) => {
    let query = req.query.q;
    getGoogleTrends(query).then(r => {
        res.send(r)
    }).catch(err => {
        res.status(503)
        res.send("Server Out of API credits")
    })
})
app.get('/search/data', (req, res) => {
    let query = req.query.q;
    getData(query).then(r => {
        res.send(r)
    }).catch(err => {
        res.status(503)
        res.send("Server Out of API credits")
    })
})
app.get('/trends', (req, res) => {
    getTrendingData().then(r => {
        res.send(r)
    }).catch(err => {
        res.status(503)
        res.send("Server Out of API credits")
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})