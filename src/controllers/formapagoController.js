const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) =>{
        var sql = "SELECT *  FROM formaPago";
        conn.query(sql, (err, result, fields) => {
           if (err) { res.status(500).json({error: err.message});}else{
            res.status(200).json(result);
           }   
        }); 
    });
}

controller.listByID = (req, res) => {
    
    const { pkidformaPago } = req.params; 
    req.getConnection((err, conn) =>{
        conn.query('SELECT * FROM formaPago WHERE pkidformaPago = ?', [pkidformaPago], (err, formaPagos) => {
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
            conn.query('INSERT INTO formaPago set ?', [data], (err, formaPagos) => {
                if (err){ res.status(500).json({error: err.message});}else{
                    res.status(200).json({"response": "success"});
                }
            }); 
           
        });
       
}

controller.delete = (req, res) => {
    const { pkidformaPago } = req.params; 
    req.getConnection((err, conn) =>{
       
        conn.query( "DELETE FROM formaPago WHERE pkidformaPago = ?", [pkidformaPago], (err, rows) => {
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
        conn.query('UPDATE formaPago set ? WHERE pkidformaPago = ?', [newformaPago, pkidformaPago], (err, row) => {
            if (err){ res.status(500).json({error: err.message});}else{
                res.status(200).json({"response": "success"});
            }
        });
        
    })
   
}

module.exports= controller;