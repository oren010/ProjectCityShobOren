const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const zonesRouter = require('./routes/zones');
const sitesRouter = require('./routes/sites');
const placemarksRouter = require('./routes/placemarks');
const layersRouter = require('./routes/layers');

app.use('/zones', zonesRouter);
app.use('/sites', sitesRouter);
app.use('/placemarks', placemarksRouter);
app.use('/layers', layersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
