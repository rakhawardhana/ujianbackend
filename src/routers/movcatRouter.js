const conn = require('../connection/index')
const router = require('express').Router()

// ADD CATEGORIES
router.post('/movcat', (req,res) => {
    const sql = `INSERT INTO movcat SET ?
              join movcat on movies.id = movcat.movie_id
              join categories on categories.id = movcat.category_id
              WHERE movies.nama = ? and categories.nama = ? `
    // const sql2 = `select movies.nama as nama_movie, categories.nama as nama_categories 
    //              from movies
    //              join movcat on movies.id = movcat.movie_id
    //              join categories on categories.id = movcat.category_id where id = ?`
        const sql2 = `select movies.nama as nama_movie, categories.nama as nama_categories 
                 from movies
                join movcat on movies.id = movcat.movie_id
                join categories on categories.id = movcat.category_id
                where movies.nama = ?`
                
         const data = req.body

    // Post data
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


// NOMOR 3 DELETE CATEGORIES
router.delete('/movcat/', (req, res)=> {
    const sql2 = `SELECT * FROM movcat`
    const sql = `DELETE FROM movcat WHERE nama = '${req.body.uname}'`

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

module.exports = router