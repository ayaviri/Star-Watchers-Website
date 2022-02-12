import axios from 'axios';
import * as secrets from './secrets.js';

export const getTumblrData = async (searchQuery) => {
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
  }
};

const getTumblrPosts = async (searchQuery) => {
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
    for (let index = 0; index < 5; index ++) {
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

export const getRedditPosts = async(searchQuery) => {
    try {
        const apiResponse = await axios.get(`https://www.reddit.com/search.json?q=${searchQuery}&limit=5`, {
            headers: {
                'Content-type': 'application/json'
            }
        });

        // logs to the url to the top post for this search query
        console.log(apiResponse.data.data.children.map((x) => {
            return {
                "title": x.data.title,
                "img": x.data.url,
                "link": `https://www.reddit.com/${x.data.permalink}`
            }
        }));
    } catch (error) {
        console.log(error.message);
    }
}


