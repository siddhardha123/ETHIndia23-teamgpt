const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
dotenv.config()
const app = express();
const PORT = 3001;

const mongoURI = process.env.MONGO_URL
mongoose.connect(mongoURI);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});


app.use(bodyParser.json());

const orgRoutes = require('./routes/org.router');
app.use('/api', orgRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});




