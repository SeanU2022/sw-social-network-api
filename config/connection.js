const { connect, connection } = require('mongoose');

// After you create your Heroku application, visit https://dashboard.heroku.com/apps/ select the application name and add your Atlas connection string as a Config Var
// Node will look for this environment variable and if it exists, it will use it. Otherwise, it will assume that you are running this application locally
// https://www.berato.tech/connecting-your-heroku-app-to-atlas
// 1. Add repo to GIT sw-social-network-api
// 2. Create Heroku app with GitHub repo link
// 3. Mongo Atlas Connect to Cluster0; Connect to your application MongoDB Drivers
// 3 (i) use Node.js driver and copy the connection string
// 3 (ii) paste connection string to Heroku Config Var MONGODB_URI:
// 3 (iii) mongodb+srv://seanw:<password>@cluster0.a2oshzw.mongodb.net/?retryWrites=true&w=majority
// 3 (vi) password is MongoDB atlas password
// 4 CONFIGURE MONGO GO > SECURITY > NETWORK ACCESS
//    Click + ADD IP ADDRESS to set 0.0.0.0 to allow anyone in


const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialnetworkDB';

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// models>User>username trimmed
// FIX LATER
// connection.Schema.Types.String.set('trim', true);

module.exports = connection;
