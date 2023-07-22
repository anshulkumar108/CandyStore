const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json({ extended: true }));

const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const { sequelize } = require('./database/database.js');
const routes = require('./router/candyStoreRoute');
const { Candy } = require('./model/candystore');
app.use('/CandyStore', routes);

const port = 4500; // Define the port you want to listen to

(async () => {
  try {
    await sequelize.sync();
    console.log('Database synchronized successfully.');
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
