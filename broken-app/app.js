const express = require('express');
let axios = require('axios');
var app = express();

app.use(express.json()); // Middleware to parse JSON bodies

const fetchUserData = async (username) => {
  const response = await axios.get(`https://api.github.com/users/${username}`);
  return response.data;
};

app.post('/', async (req, res, next) => {
  try {
    const usernames = req.body.developers;
    if (!Array.isArray(usernames)) {
      return res.status(400).send('Invalid input format');
    }

    const userDataPromises = usernames.map(username => fetchUserData(username));
    const usersData = await Promise.all(userDataPromises);

    const output = usersData.map(user => ({ name: user.name, bio: user.bio }));
    res.json(output); // Express automatically sets content-type to JSON
  } catch (err) {
    next(err); // Pass errors to the error handling middleware
  }
});

// 404 handler
app.use(function (req, res, next) {
  return next(new ExpressError("Not Found", 404));
});

// generic error handler
app.use(function (err, req, res, next) {
  // the default status is 500 Internal Server Error
  let status = err.status || 500;

  // set the status and alert the user
  return res.status(status).json({
    error: {
      message: err.message,
      status: status
    }
  });
});

app.listen(3000, function(){
  console.log("Server starting on port 3000")
})