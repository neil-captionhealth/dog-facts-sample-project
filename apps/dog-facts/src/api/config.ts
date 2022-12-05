import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3333/api/',
  headers: {
    'Content-type': 'application/json',
  },
  params: {
    max_length: 140,
    limit: 25, // to test the transition between pages you can use 5
  },
});
