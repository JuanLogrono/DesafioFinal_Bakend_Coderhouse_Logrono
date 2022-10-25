import passport from '../modules/usuarios(login-registro)/Service_User/passport_Service/passport.js';

export const authJWT=passport.authenticate("jwt",{session:false, failureRedirect:"/api/login"})