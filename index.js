const express = require('express');
const app = express();
const morgan = require('morgan');

// settings
app.set("port", 3000);
app.set('json spaces',2);


// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.use(require('./src/routes/index.js'));
app.use('/api/movies',require('./src/routes/movies.js'))

// starting the server
app.listen(app.get("port"), () => {
  console.log("Server on port ${app.get('port')}");
});
