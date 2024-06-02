const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bikerRoutes = require('./routes/bikes');
const cors = require('cors');
var jwt = require('jsonwebtoken');
const User = require('./models/userSchema')
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 8585;

const dotenv = require('dotenv');
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
// function to verify


// const requireAuth = (req, res, next) =>{
//   const token1 = req.cookies.jwt;
//   var token2 = false;
//   if(!req.cookies.email){
//     res.send('No student is Authorised')
//   }
//   User.find({email : req.cookies.email}).then(val =>{
//     if(val[0].role === 'admin'){
//       token2 = true;
//       if(token1 && token2){
//         jwt.verify(token1,'kslkdlkhiy8iyiuiuh87y87yhhyg87yugug78uyiy9y87dls', (err, decodedToken) =>{
//           if(err){
//             console.log('huhiuiuhihiuhihu');
//             console.log(err.message);
//           }else{
//             next();
//           }
//         });
//           }
//           else{
//             res.send('404 error no student in authorised');
//           }
//     }

//     });

// };




// function end


app.use(session({
  secret: 'asdfghjtrewsdfg xcvbnghj',  // Replace with a strong secret
  resave: false,
  saveUninitialized: true
}));


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware


app.use(cors());
// Routes
app.use('/api', bikerRoutes);
app.use('/api', require('./routes/auth'));
app.use('/api', require('./routes/contactDetails'));
app.use('/api', require('./routes/PersonalDetails'));
app.use('/api', require('./routes/BillGeneration'));
app.use('/api', require('./routes/Feedback'));





// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
