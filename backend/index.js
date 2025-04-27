import express from "express";
import db from './config/db.js'
import users from'./routers/users.js'
import quiz from './routers/quizzes.js'
import notes from './routers/notes.js'
import bodyParser from "body-parser";
import cookieParser from "cookie-parser"; 
import cors from "cors";

const app = express()
const port = 3000
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true              
}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/users', users)
app.use('/api/quiz', quiz)
app.use('/api/notes', notes)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})