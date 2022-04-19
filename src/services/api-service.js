import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const key = '16192895-b30e865bfa1f0fc43dcc0dc3e';
const imageFetch = function ({ searchQuery = '', currentPage, per_page = 15 }) {
  return axios
    .get(
      `?key=${key}&q=${searchQuery}&page=${currentPage}&per_page=${per_page}`,
    )
    .then(response => response.data)
    .then(data => data.hits);
};

export default imageFetch;
