const express = require('express');
const app = express();
const dbconnect = require('./db/connect');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const env_config = require('./config/config');
const port = env_config.get_active_config().web_port;

dbconnect.connect(true);
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(cors());


app.use(express.json());
app.use(cookieParser())

// var allRoutes = require('./routes/allRoutes');
// app.use('/api/auth', auth);

// app.use('/api', allRoutes);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))