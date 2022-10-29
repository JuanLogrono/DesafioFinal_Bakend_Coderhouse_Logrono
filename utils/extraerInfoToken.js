import { config } from "dotenv";
import  Jwt  from "jsonwebtoken";
config()
/**
 * 
 * @param {token} auth 
 * @returns nombre_de_usuario_y_tipo
 */
export const extraerUsername=(token)=>{
   const data=Jwt.decode(token,process.env.SECRET)
   const {sub, user}=data
   return {sub, user:user}
}