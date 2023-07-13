const admin = require('../config/firebase.config');

class Middleware{
        async decodeToken(req, res, next){

            const authorizationHeader = req.headers.authorization;
            let token = "";

            if (authorizationHeader && authorizationHeader.split(" ")[1]) {
                 token = authorizationHeader.split(" ")[1];
            } else {
                return res.json({ mensaje: "Error interno --> No Autorizado --> No se ha agregado Token de Acceso"});
            }

            try{               
                const decodeValue = await admin.auth().verifyIdToken(token);
                //console.log(decodeValue);
                
                
                if (decodeValue){
                    next();
                }else{
                    return res.json({ mensaje: "No autorizado"});
                }
            }catch(e){
                return res.json({ mensaje: "Error interno --> No Autorizado"});
            }
           
        }
}

module.exports = new Middleware();