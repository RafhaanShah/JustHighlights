import axios from 'axios';
import { soccerKeywords, soccerVideoSites, soccerEmbedSites } from '../res/soccer';

function getRedditLink(subreddit) {
  return `https://www.reddit.com/r/${subreddit}/new.json?sort=new&limit=1000&t=day`
  // return `https://www.reddit.com/search.json?q=subreddit:${subreddit}&type=link&sort=new&t=day`
}

export async function fetchSoccerPosts() {
  const subreddit = 'soccer';

  try {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);
    const timestamp = Math.floor(currentDate.getTime() / 1000);

    const link = getRedditLink(subreddit)
    const response = await axios.get(link);

    if (response.status === 200) {
      const posts = response.data.data.children;

      const filteredPosts = posts.filter(post => {
        const postTimestamp = post.data.created_utc;
        const title = post.data.title;
        const url = post.data.url

        if (!url) {
          return false;
        }

        if (!hasKeyword(url, soccerVideoSites)) {
          return false;
        }

        if (postTimestamp < timestamp) {
          return false;
        }

        const titleRegex = /.+\[?\d\]?\s?-\s?\[?\d\]?.+/;

        if (!titleRegex.test(title)) {
          return false;
        }

        if (!hasKeyword(title, soccerKeywords)) {
          return true;
        }

        return true;
      });

      const mappedPostList = filteredPosts.map(post => ({
        title: post.data.title,
        link: post.data.url,
        embed: hasKeyword(post.data.url, soccerEmbedSites)
      }));

      const sortedPosts = mappedPostList.sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();

        if (titleA < titleB) {
          return -1; // titleA comes before titleB
        }
        if (titleA > titleB) {
          return 1; // titleA comes after titleB
        }
        return 0; // titles are equal
      });

      return sortedPosts;
    } else {
      throw new Error(`Error fetching subreddit posts: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    throw new Error(`An error occurred: ${error.message}`);
  }
}

function hasKeyword(inputString, keywords) {
  for (const keyword of keywords) {
    if (inputString.includes(keyword)) {
      return true;
    }
  }
  return false;
}
