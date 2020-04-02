require('dotenv').config();
const express = require('express');
const axios = require('axios');

const { API_KEY } = process.env;
const app = express();
const port = 5000;

app.get('/movies/:title', async(req, res) => {
  const { title } = req.params;
  try {
    const openMovieRes = await axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${title}`);
    res.send(openMovieRes.data);
  } catch(err) {
    res.send('error')
  }
});

app.listen(port, () => `Server running on port ${port}`);