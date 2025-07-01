const express = require('express');
const app = express();
require('./../config/database'); // Adjust the path as necessary


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});