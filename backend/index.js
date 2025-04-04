import express from "express";
import db from './config/db.js'
import users from'./routers/users.js'
import bodyParser from "body-parser";
import cookieParser from "cookie-parser"; 
const app = express()
const port = 3000
app.use(cookieParser());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/users', users)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})