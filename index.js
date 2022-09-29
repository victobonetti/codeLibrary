// requires
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

//link to api's
const posts = require('./routes/api/posts')
const categories = require("./routes/api/categories");

app.use('/api/posts', posts );
app.use('/api/categories', categories );
app.use('/api/edit', posts)


// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Handle production

// if (process.env.NODE_ENV === 'production') {
// 	console.log("on PRODUCTION")
  
	  // Static folder
	  app.use(express.static(__dirname + '/dist/'));
	
	  // Handle SPA
	  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/dist/index.html'));
	

	// app.get(/.*/, (req, res) => res.sendFile(__dirname + '/hello-world/public/index.html'));
// }

const port = process.env.PORT || 8080
app.listen(port, () => {
	console.log(`app is listening on port: ${port}`)
})
