const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check if token exists and is verified
  if (token) {
    jwt.verify(token, 'kslkdlkhiy8iyiuiuh87y87yhhyg87yugug78uyiy9y87dls', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login'); // or handle unauthorized access as per your requirement
      } else {
        console.log(decodedToken);
        next(); // move to the next middleware
      }
    });
  } else {
    res.redirect('/login'); // or handle unauthorized access as per your requirement
  }
};

module.exports = { requireAuth };
