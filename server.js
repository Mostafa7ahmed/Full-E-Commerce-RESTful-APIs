const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const dbConnection  = require('./config/database');

const categoryRoutes = require('./Routes/category.routes');
const subcategoryRoutes = require('./Routes/subCategory.routes');
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
app.use('/api/v1/subcategories', subcategoryRoutes);

app.all(/.*/, (req, res, next) => {
  next( new apiErrorHandel(`Can't find ${req.originalUrl} on this server!`, 400) );
})

// Global Error Handling Middleware
app.use(globalError);


const port = process.env.PORT || 3000;
const server =app.listen(port, () => {
  console.log(`🚀 Example app listening on port ${port}`);
});


//  Handle unhandled promise rejections 
process.on('unhandledRejection', (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.log(`server shutting Down`)
    process.exit(1);

  });
});

//  Handle uncaught exceptions
