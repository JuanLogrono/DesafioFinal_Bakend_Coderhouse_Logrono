import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import UserDaoMongo from "../../Dao_User_mongo/daoUserMongo.js";
import { config } from 'dotenv'
config()

const jwtService = new UserDaoMongo()

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.signedCookies[opts.jwtCookieName];
  }
  return token;
};


const opts = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor, ExtractJwt.fromAuthHeaderAsBearerToken()]),
  secretOrKey: process.env.SECRET,
  jwtCookieName: 'jwt'
}


export const jwtStrategy = new JwtStrategy(opts, async (jwt_payload, done) => {
  const user = await jwtService.readUser(jwt_payload.username)
  if (user) return done(null, user);
  else return done(null, false)
})