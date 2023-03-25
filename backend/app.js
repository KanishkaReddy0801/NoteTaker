const express = require("express")
const app = express()
const cors = require("cors")

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
})

const loginRoute = require('./routes/login')
const registrationRoute = require('./routes/registration')
const noteRoute = require('./routes/notes')


const dotenv = require("dotenv")
dotenv.config()
const mongoose = require("mongoose")
mongoose.connect('mongodb+srv://kanishka:kanishka0801@surveydbcluster.driduvu.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    //useUnifiedTopology: true,
    //useCreateIndex: true,
}).then(() => {
    console.log('Connected to MongoDB')
}).catch((err) => {
    console.error('Failed to Connect to MongoDB')
})

app.use(cors())
app.use(express.json())

app.use('/', loginRoute)
app.use('/', registrationRoute)
app.use('/', noteRoute)

const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`Server running on ${port}`)
})