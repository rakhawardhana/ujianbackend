const conn = require('../connection/index')
const router = require('express').Router()


// NOMOR 1 ADD CATEGORIES
router.post('/categories', (req,res) => {
    const sql = `INSERT INTO categories set ?`
    //const sql2 = `SELECT * from categories where id =?`
    const sql2 = `SELECT nama from categories where id =?`
    const data = req.body


    conn.query(sql,data, (err,result1) => {
        if(err){
            return res.send(err)
        }


        conn.query(sql2,result1.insertId, (err,result2) => {
            if(err){
                return res.send(err)
            }
           
            res.send(result2[0])

            
        })
    })
})


// NOMOR 2 EDIT CATEGORIES
router.patch('/categories/profile/:uname', (req, res) => {
    const sql = `UPDATE categories SET ? WHERE nama = ?`
    const sql2 = `SELECT nama FROM categories WHERE nama = '${req.params.uname}'`
    const data = [req.body, req.params.uname]
    

    

    // UPDATE (Ubah data categori di database)
    conn.query(sql, data, (err, result) => {
        if(err) return res.send(err)

        // SELECT (Ambil category dari database)
        conn.query(sql2, (err, result) => {
            // result SELECT adalah array
            if(err) return res.send(err)

            // Kirim movie 
            res.send(result)
        })
    })
})

// NOMOR 3 DELETE CATEGORIES
router.delete('/categories/', (req, res)=> {
    
    const sql = `DELETE FROM categories WHERE nama = '${req.body.uname}'`
    const sql2 = `SELECT * FROM categories`
    
    // cara kedua (menampilkan array kosong setelah dihapus)
    //const sql2 = `SELECT * FROM categories WHERE nama = '${req.body.uname}'`
    //const sql = `DELETE FROM categories WHERE nama = '${req.body.uname}'`

    conn.query(sql, (err, result) => {
        if(err) return res.send(err)

        
        conn.query(sql2, (err, result2) => {
            if(err) res.send(err)

            res.send(result2)
        })
        //})
    })
})


// NOMOR 4 SHOW ALL CATEGORIES
router.get('/categories/all', (req, res) => {
    const sql = `SELECT * FROM categories`
    //const data = req.params.username

    conn.query(sql, (err, result) => {
        // Jika ada error dalam menjalankan query, akan dikirim errornya
        if(err) return res.send(err)

        
        res.send(result)
    })
})



module.exports = router