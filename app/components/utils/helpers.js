// Include the axios package for performing HTTP requests (promise based alternative to request)
import axios from "axios";

// Geocoder API
const nytAPI = "3e50f466c4e54bbfa2f7adaf9a3332b1";

// Helper Functions (in this case the only one is runQuery)
const helpers = {

  runQuery: (articlesearch) => {

    console.log(articlesearch);

    const queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + nytAPI + "&q=" + articlesearch;

    return axios.get(queryURL).then((response) => {

      console.log(response);
      return response.data.results[0].formatted;
    });

  }
};

// We export the helpers function
export default helpers;