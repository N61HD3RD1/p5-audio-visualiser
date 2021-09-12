app.get('/login', function (req,res) {
         res.render('login.html');
      });
  
      app.post('/loggedin', function (req,res) {
          const saltRounds = 10;
          const plainPassword = req.body.password;
          const bcrypt  = require ('bcrypt');
          bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword) {
          // check form data hashed password with the password saved in DB
          if (err) throw err;
          var MongoClient = require('mongodb').MongoClient;
          var url = 'mongodb://localhost';
          MongoClient.connect(url, function(err, client) {
          if (err) throw err;
          var db = client.db ('mybookshopdb');
          db.collection('users').findOne({name: req.body.name} ,function(err, result) {
          if (err) throw err;
          if(result == null){
          res.send('Login Unsuccessful, wrong username');
           }
          else {
           /// checking password is not included in this code

           // **** save user session here, when login is successful
           res.send('You are now loggedin, You user name is: '+ req.body.name + ' your password is: '+ req.body.password +' and your hashed password is: '+ hashedPassword

+ '<br />'+'<a href='+'./'+'>Home</a>');
           }
          client.close();
          })
        })
      });
})