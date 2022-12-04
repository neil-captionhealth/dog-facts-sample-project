import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3333/api/',
  headers: {
    'Content-type': 'application/json',
  },
  params: {
    max_length: 140,
    limit: 5, // TODO 25
  },
});
