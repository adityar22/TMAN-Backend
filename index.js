const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');

const connectDB = require('./server/database/connection');
const taskRouter = require('./server/routes/taskRouter');
const userRouter = require('./server/routes/userRouter');
const notesRouter = require('./server/routes/notesRouter');
const eventsRouter = require('./server/routes/eventsRouter');

const app = express();
dotenv.config({ path: "config.env" })
const PORT = process.env.PORT || 9001;

//tag req
app.use(morgan('tiny'));

//mongoDB connection
connectDB();

//parse req
app.use(cors({
    origin: process.env.CLIENT_URL
}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use((req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

app.use('/api/tasks', taskRouter);
app.use('/api/user', userRouter);
app.use('/api/notes', notesRouter);
app.use('/api/events', eventsRouter);

app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`) });