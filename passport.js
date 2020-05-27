const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = function(passport) {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = process.env.JWT_SECRET;
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
        return done(null, jwt_payload);
    })
  );
};
