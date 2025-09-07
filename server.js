const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const dbConnection  = require('./config/database');
const categoryRoutes = require('./Routes/category.routes');
dotenv.config({ path: './config.env' });
const apiErrorHandel = require("./utils/apiError")
const globalError = require("./middlewares/errormiddlewares")
dbConnection();

const app = express();
app.use(express.json());
// 3. Enable morgan in development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`Morgan enabled ===> ${process.env.NODE_ENV}`);
}


// 4. Start server
app.use('/api/v1/categories', categoryRoutes);
app.all(/.*/, (req, res, next) => {
  next( new apiErrorHandel(`Can't find ${req.originalUrl} on this server!`, 400) );
})

// Global Error Handling Middleware
app.use(globalError);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Example app listening on port ${port}`);
});


