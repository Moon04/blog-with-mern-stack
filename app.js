const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const createError = require('http-errors');
const passport = require('passport');
const logger = require('morgan');
const mongoose = require('mongoose');
const multer  = require('multer');
const path = require('path');
const config = require('./config');
const authRouter = require('./router/auth');
const basicDataRouter = require('./router/basicdata');
const userRouter = require('./router/user');
const postRouter = require('./router/post');

const app = express();

mongoose.connect(config.dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('- Connected successfully to database');

    // Middlewares
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.static((path.join(__dirname, 'public'))));
    app.use(cors());

    app.use(passport.initialize());
    app.use(passport.session());
    require('./passport')(passport);

    // Routes
    app.use('/', authRouter);
    app.use('/basicdata', basicDataRouter);
    app.use(passport.authenticate('jwt', { session: false }));
    app.use('/user', userRouter);
    app.use(multer().single('userFile'));
    app.use('/post', postRouter);

    // catch 404 and forward to error handler
    app.use((req, res, next) => {
      next(createError(404));
    });

    // error handler
    app.use((err, req, res, next) => {
      if (err.name === 'MulterError') {
        return res.status(400).json('please use the property "userFile" to upload your images');
      }
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.send('error');
    });

    app.listen(config.port, () => console.log(`- Server is listenin on port ${config.port}`));
  })
  .catch(err => console.log('- Error while connecting to the database', err));

module.exports = app;
