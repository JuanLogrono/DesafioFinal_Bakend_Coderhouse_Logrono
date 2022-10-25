import PersistenciaMongoDb from "../../persistencia/Persistencia_MongoDB/persistenciaMongoDb.js";
import {conexion,order} from '../../../configuraciones/mongo_config/mongoConfig.js'

export default class OrdersDaoMongo{
    constructor(){
        this.dao= new PersistenciaMongoDb(conexion,order)
    }
   async finishOrder(){
    try {
        
    } catch (error) {
        console.log(error,"finishOrder OrderDaoMongo")
    }
   }

   async readOrdersByUsername(){
    try {
        
    } catch (error) {
        console.log(error,"readOrderByUsername OrderDaoMongo")
    }
   }
} 