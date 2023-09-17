const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/user')

const link = "mongodb+srv://dikkpsd:zksurt@users.s1qlvfq.mongodb.net/";

const app = express()
app.use(cors()); // for sending data from frontend to backend
// app.options('*', cors())
app.use(express.json());                   // data using stringified json format
app.use(bodyParser.urlencoded({extended:true}));  // helps with sending requests in form-encode part


mongoose.connect(link).then(()=>{
  console.log("connection is ready");
});
const port = 3001


app.post('/', async (req, res) => {
  let {email, username, password} = req.body;
  console.log(username);
    let user = new User(
      {
          email: req.body.email,
          username: req.body.username,
          password: req.body.password,
      }
    );
    console.log(user);
    user = await user.save();
    if (!user) {
      return res.send({
        message: "Can't Sign in",
        alert: false,
      });
    }
    res.send({
      message: "Signup Successful",
      alert: true,
    });

});



app.get('/', async(req, res) => {
  const userList = User.find();
  res.send(userList);
});

app.post('/data', (req, res)=>{
    const email = req.body.email;
    const pass = req.body.email;
    console.log(req.body);
    res.send('success');
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
