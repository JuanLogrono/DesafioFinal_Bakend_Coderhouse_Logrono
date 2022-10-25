import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local"
import bcrypt, { genSaltSync } from "bcrypt"
import UserDaoMongo from "../../Dao_User_mongo/daoUserMongo.js";


const passportService = new UserDaoMongo()


passport.use('registro', new LocalStrategy(async (username, password, callback) => {
    try {
        const userReg = await passportService.readUser(username);
        if (userReg.length>0) { return callback() };
        const passHash = bcrypt.hashSync(password, genSaltSync(10));
        const newUser = { username, password: passHash,nombre:"",telefono:"" }
        await passportService.addUser(newUser)
        callback(null, newUser)
    }
    catch (err) {
        console.log(err)
    }
}))

passport.use('auth', new LocalStrategy({ session: false }, async (username, password, callback) => {
    const userLogArray = await passportService.readUser(username);
    const userLog = userLogArray[0]
    if (!userLog || !bcrypt.compareSync(password, String(userLog.password))) return callback();
    callback(null, userLog);
}));


export default passport