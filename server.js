const express = require('express');
const app = express();
const dbconnect = require('./backend/db/connect');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const env_config = require('./backend/config/config');
const port = env_config.get_active_config().web_port;
var json2xls = require('json2xls');

dbconnect.connect(true);
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(cors());

app.use(json2xls.middleware);
app.use(express.json());
app.use(cookieParser())
var allRoutes = require('./backend/routes/allRoutes');

app.use('/api', allRoutes);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))