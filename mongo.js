const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.CONNECTION_CLOUDMONGODB)
  .then(() => {
    console.log('Database connected')
  }).catch(err => {
    console.log(err)
  })
