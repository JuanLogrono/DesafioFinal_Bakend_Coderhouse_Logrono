import winstonLogger from "../configuraciones/winston_config/winstonConfig.js"


const errorRuta=(req, res,next) => {
    winstonLogger.warn(`ruta ${req.url}, método ${req.method} no implementada`)
    res.status(404).render("error",{
        error: 404,
        mensaje: `ruta ${req.url}, método ${req.method} no implementada`
    })}

const catchError=(error, req, res, next) => {
        winstonLogger.error(error.message)
        res.status(500).render("error",{error:500 , mensaje:error.message});
    }


    export default {errorRuta, catchError}