const express = require("express");
const config = require('./config');
const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const port = process.env.PORT || config.port;

const app = express();

// Add Headers / for cross-browsing
app.all('*', function(req, res, next) {
    /**
     * Response settings
     * @type {Object}
     */
    var responseSettings = {
        "AccessControlAllowOrigin": '*',
        "AccessControlAllowHeaders": "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
        "AccessControlAllowMethods": "POST, GET, PUT, DELETE, OPTIONS",
        "AccessControlAllowCredentials": true
    };

    /**
     * Headers
     */
    res.header("Access-Control-Allow-Credentials", responseSettings.AccessControlAllowCredentials);
    res.header("Access-Control-Allow-Origin", responseSettings.AccessControlAllowOrigin);
    res.header("Access-Control-Allow-Headers", (req.headers['access-control-request-headers']) ? req.headers['access-control-request-headers'] : "x-requested-with");
    res.header("Access-Control-Allow-Methods", (req.headers['access-control-request-method']) ? req.headers['access-control-request-method'] : responseSettings.AccessControlAllowMethods);

    if ('OPTIONS' == req.method) {
        res.send(200);
    } else {
        next();
    }

});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cookieParser());

// routers
// const devices = require('./apis/devices');

// app.use('/devices',devices);
app.post('/test',(req,res)=>{
    var result = {
        data : 'result',
        result : 'abcd',
        id : 'CaScc'
    };

    res.send(result);
})




app.listen(port,_=>{
    console.log(`server started with ${port}`)
});