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

var authRoute=require('./backend/routes/auth');
var allRoutes = require('./backend/routes/allRoutes');
var verify =require('./backend/verifytoken');
app.use('/api/auth',authRoute);
app.use('/api', allRoutes);
app.use(express.static(__dirname + '/plagiarismDetection/dist/plagiarismDetection'));

app.get('/*', function(req, res) {

    res.sendFile(path.join(__dirname + '/plagiarismDetection/dist/plagiarismDetection/index.html'));
});

var server=app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

server.timeout=1000*60*10;