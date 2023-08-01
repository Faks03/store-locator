const express = require('express')
const app = express()
const cors = require('cors')
const storeRoutes = require('./routes/store')
const connectDB = require('./config/db')
const path = require('path')

require('dotenv').config()

const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public'))  )


app.use('/api/v1/', storeRoutes)

const start = async () => {
    try {
      await connectDB(process.env.MONGO_URI);
    //   console.log("Connected to DB")
      app.listen(port, () => {
        console.log(`Server listening on port ${port}!`);
      });
    } catch (error) {
      
      console.log("Internet Not Connected");
    }
  };

start();
