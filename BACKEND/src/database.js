const mongoose= require('mongoose')



const URI = process.env.MONGODB_URI 
? process.env.MONGODB_URI: 'mongodb://localhost/dataBaseTest'

mongoose.connect(URI)


const connection = mongoose.connection


connection.once('open', () => {
    console.log('db is connected')
})