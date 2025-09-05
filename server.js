const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

// 2. Connect to database
mongoose.connect(process.env.DB_URL)
  .then((connect) => {
    console.log(`✅ Database connected successfully to ${ connect.connection.host }`);
  })
  .catch(err => {
    console.error('❌ Database connection error:', err);
    process.exit(1);
  });

const app = express();

// 3. Enable morgan in development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`Morgan enabled ===> ${process.env.NODE_ENV}`);
}

// 4. Start server
const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});
app.listen(port, () => {
  console.log(`🚀 Example app listening on port ${port}`);
});
