const express = require('express');
const path = require('path');
const http = require('http');
const SocketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = SocketIO(server);

app.set('port', process.env.PORT || 3000);


app.use(express.json());



app.use( (req, res, next) => {
   const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
   error.status = 404;
   next(error);
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


// listner
const server = app.listen(app.get('port'), () => {
    console.log(app.get('port'), "번 포트에서 대기 중");
});
