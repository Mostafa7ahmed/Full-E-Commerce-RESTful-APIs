const mongoose = require('mongoose');
const dbConnection  = () =>{
    mongoose.connect(process.env.DB_URL)
      .then((connect) => {
        console.log(`✅ Database connected successfully to ${ connect.connection.host }`);
      })
      .catch(err => {
        console.error('❌ Database connection error:', err);
        process.exit(1);
      });
}
module.exports = dbConnection;