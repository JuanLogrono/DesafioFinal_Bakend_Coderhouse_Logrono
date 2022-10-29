
export class ChatDto{
    constructor(data){
        this.username= data.username
        this.timestamp= data.timestamp || new Date()
        this.autorizacion= data.autorizacion
        this.mensaje= data.mensaje
    
    }
}
