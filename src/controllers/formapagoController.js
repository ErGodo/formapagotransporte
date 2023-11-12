const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) =>{
        var sql = "SELECT *  FROM formapago";
        conn.query(sql, (err, result, fields) => {
            conn.release;
           if (err) { res.status(500).json({error: err.message});}else{
            res.status(200).json(result);
           }   
        }); 
    });
}

controller.listByID = (req, res) => {
    
    const { pkidformaPago } = req.params; 
    req.getConnection((err, conn) =>{
        conn.query('SELECT * FROM formapago WHERE pkidformaPago = ?', [pkidformaPago], (err, formaPagos) => {
            conn.release;
            if (err){ res.status(500).json({error: err.message});}else{
                res.status(200).json(formaPagos);
            }
        }); 
    });
}


// Definición del endpoint para insertar los dato
controller.save = (req, res) => {
    const data = req.body;  
    req.getConnection((err, conn)=>{
            conn.query('INSERT INTO formapago set ?', [data], (err, formaPagos) => {
                conn.release;
                if (err){ res.status(500).json({error: err.message});}else{
                    res.status(200).json({"response": "success"});
                }
            }); 
           
        });
       
}

controller.delete = (req, res) => {
    const { pkidformaPago } = req.params; 
    req.getConnection((err, conn) =>{
       
        conn.query( "DELETE FROM formapago WHERE pkidformaPago = ?", [pkidformaPago], (err, rows) => {
            conn.release;
            if (err){ res.status(500).json({error: err.message});}else{
                res.status(200).json({"response": "success"});
            }     
          });
        
    })
}

controller.edit = (req, res) => {
    const { pkidformaPago } = req.params;
    const newformaPago = req.body;

    req.getConnection((err, conn) =>{
        conn.query('UPDATE formapago set ? WHERE pkidformaPago = ?', [newformaPago, pkidformaPago], (err, row) => {
            conn.release;
            if (err){ res.status(500).json({error: err.message});}else{
                res.status(200).json({"response": "success"});
            }
        });
        
    })
   
}

module.exports= controller;