import { config } from "dotenv";
import  Jwt  from "jsonwebtoken";
config()
/**
 * 
 * @param {token} auth 
 * @returns nombre_de_usuario_y_direccion
 */
export const extraerUsername=(token)=>{
   const data=Jwt.decode(token,process.env.SECRET)
   return data
}