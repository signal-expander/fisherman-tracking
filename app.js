const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const socketHandler = require('./socketHandler');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const userRoutes = require('./routes/userRoutes');
const fishermanRoutes = require('./routes/fishermanRoutes');
const globalErrHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const fishermanController = require('./controllers/fishermanController');



// Allow Cross-Origin requests
app.use(cors());

// Set security HTTP headers
// app.use(helmet());

// Limit request from the same API 
// const limiter = rateLimit({
//     max: 150,
//     windowMs: 60 * 60 * 1000,
//     message: 'Too Many Request from this IP, please try again in an hour'
// });
// app.use('/api', limiter);

// Body parser, reading data from body into req.body
// app.use(express.json({
//     limit: '15kb'
// }));

// Data sanitization against Nosql query injection
// app.use(mongoSanitize());

// Data sanitization against XSS(clean user input from malicious HTML code)
// app.use(xss());

// Prevent parameter pollution
// app.use(hpp());

app.use(express.static('client/build'));

// Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/fisherman', fishermanRoutes);

// request from esp
app.get('/api/v1/esp/save-gps', (req, res) => {
    fishermanController.saveEspGpsData(req, res, (params) => {
        if (params.status === 500)
            return res.status(500).send("failed");
        io.emit(`plot_gps`, params);
        res.status(200).send("success");
    });
});

io.use(function (socket, next) {
    // let token = ''; 
    // let section = '';
    // socket.handshake.headers.cookie.split(';').map((d) => {
    //     const temp = d.split('=');
    //     switch (temp[0].trim()) {
    //         case 'token':
    //             token = temp[1];
    //             break;
    //         case 'section':
    //             section = decodeURI(temp[1]).split("\"")[1];
    //             break;
    //         default:
    //             break;
    //     }
    // });

    // socketHandler.auth_user(socket, { token, section }, () => {
    //     next();
    // });
    next();

}).on('connection', (socket) => {

    socket.on(`msg_send`, (params) => {
        socketHandler.addGpsPoints(params, () => {
            console.log("-- handler response --");
            io.emit(`msg_recv`, { hello: "universe" })
        });
    });

    // // teacher request - done
    // socket.on(`reqSms_${socket.user._id}`, (params) => {
    //     socketHandler.checkConversation(socket, params, (data) => {
    //         socket.emit(`reqSms_${socket.user._id}`, data);
    //     });
    // });

    // // student request - done
    // socket.on(`reqSmsStudent_${socket.user._id}`, () => {
    //     socketHandler.checkConversation(socket, { student_id: socket.user._id, section_id: socket.section }, (data) => {
    //         socket.emit(`reqSmsStudent_${socket.user._id}`,data);
    //     });
    // });

});


// handle static assets
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
});


// handle undefined Routes
app.use('*', (req, res, next) => {
    const err = new AppError(404, 'fail', 'undefined route');
    next(err, req, res, next);
});

app.use(globalErrHandler);

module.exports = http;