import { cpus } from "os";

export const serverInfo=(req,res)=>{
    const {platform,version,memoryUsage,cwd,pid,title}=process
    const informacion= {
        plataforma:platform,
        version_node: version,
        memoria:memoryUsage(),
        path_de_ejecucion:cwd(),
        id_del_proceso:pid,
        carpeta_del_proyecto:title,
        CPUS:cpus().length
    }
    res.render('info',{informacion})
} 
