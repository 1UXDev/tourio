// customised from the example provided by https://github.com/equk/unsplash-nextjs/
const API_CLIENTID = process.env.NEXT_PUBLIC_UNSPLASH_ID; //process.env.UNSPLASH_ID;

const API_URL = `https://api.unsplash.com/search/photos?page=1&per_page=3&client_id=${API_CLIENTID}`;
console.log(API_CLIENTID);

export default {
  async search(imageSearch) {
    const url = `${API_URL}&query=${imageSearch}`;
    try {
      const response = await fetch(url);
      const result = await response.json();
      return result.results;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};
