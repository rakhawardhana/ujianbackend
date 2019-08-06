const conn = require('../connection/index')
const router = require('express').Router()


// NOMOR 1 ADD MOVIES
router.post('/movies', (req,res) => {
    const sql = `INSERT INTO movies set ?`
    const sql2 = `SELECT nama, tahun, deskripsi from movies where id =?`
    const data = req.body

    // Post data
    conn.query(sql,data, (err,result1) => {
        if(err){
            return res.send(err)
        }

        // ambil data movie yang tadinya di post
        conn.query(sql2,result1.insertId, (err,result2) => {
            if(err){
                return res.send(err)
            }
           
            res.send(result2[0])

        })
    })
})


// NOMOR 2 EDIT MOVIES
router.patch('/movies/profile/:uname', (req, res) => {
    const sql = `UPDATE movies SET ? WHERE nama = ?`
    const sql2 = `SELECT nama, tahun, deskripsi
                    FROM movies WHERE nama = '${req.params.uname}'`
    const data = [req.body, req.params.uname]
    

    // UPDATE (Ubah data movies dengan nama tertentu di database)
    conn.query(sql, data, (err, result) => {
        if(err) return res.send(err)

        // SELECT (Ambil movie dari database)
        conn.query(sql2, (err, result) => {
            // result SELECT adalah array
            if(err) return res.send(err)

            // Kirim movienya dalam bentuk object
            res.send(result[0])
        })
    })
})

// NOMOR 3 DELETE MOVIES
router.delete('/movies/', (req, res)=> {
    const sql2 = `SELECT * FROM movies`
    const sql = `DELETE FROM movies WHERE nama = '${req.body.uname}'`

    //CARA KEDUA
    // const sql2 = `SELECT nama FROM movies WHERE nama = '${req.body.uname}'`
    //const sql = `DELETE FROM movies WHERE nama = '${req.body.uname}'`


    conn.query(sql, (err, result) => {
        if(err) return res.send(err)

            // cara pertama mengambil data seluruh movie
            // ubah jadi array kosong(cara kedua)
        conn.query(sql2, (err, result2) => {
            if(err) res.send(err)

            res.send(result2)
        })
        //})
    })
})


// NOMOR 4 SHOW ALL MOVIES
router.get('/movies/all', (req, res) => {
    const sql = `SELECT * FROM movies`
    //const data = req.params.username

    conn.query(sql, (err, result) => {
     
        if(err) return res.send(err)

        res.send(result)
    })
})



module.exports = router