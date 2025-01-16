const express = require("express");
const userRouter = require("./routes/user.routes");
const app = express();
app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
const dotenv = require('dotenv');
dotenv.config();
const connectToDb = require('./config/db')
connectToDb();
const cookie_parser = require("cookie-parser")
app.use(cookie_parser())
const indexRouter = require("./routes/index.routes");
const supabaseRoutes = require('./routes/supabase.routes');



app.use('/supabase', supabaseRoutes); // Supabase routes ke liye base path set kiya


app.use('/', indexRouter)
app.use('/user', userRouter)

app.listen(3000, ()=> {
    console.log("server is running on port 3000")
})