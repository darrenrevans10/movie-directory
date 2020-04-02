require('dotenv').config();
const express = require('express');
const path = require("path");
const axios = require('axios');

const { API_KEY } = process.env;
const app = express();
const port = process.env.PORT || 5000;

app.get('/movies/:title', async(req, res) => {
  const { title } = req.params;
  try {
    const openMovieRes = await axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${title}`);
    res.send(openMovieRes.data);
  } catch(err) {
    res.send('error')
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => `Server running on port ${port}`);