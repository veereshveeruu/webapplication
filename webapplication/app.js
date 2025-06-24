const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('🚀 Welcome to my CI/CD pipeline demo with Jenkins, Docker, and Kubernetes!');
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

