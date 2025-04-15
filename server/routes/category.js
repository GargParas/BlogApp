const express = require('express')
const pool = require('../utils/db')
const result = require('../utils/result')

const router = express.Router()

router.post('/add', (req, res) => {
    const {title} = req.body
    const sql = `INSERT INTO categories(title) VALUES(?)`
    pool.query(sql, [title], (error, data) => {
        res.send(result.createResult(error, data))
    })
})

router.get('/',(req,res)=>{
    const sql = 'select * from categories'
    pool.query(sql,(error,data)=>{
        res.send(result.createResult(error,data))
    })
})

router.delete('/:cId', (req, res) => {
    const {cId} = req.params
    const sql = `DELETE FROM categories WHERE cId = ?`
    pool.query(sql, [cId], (error, data) => {
        res.send(result.createResult(error, data))
    })
})

module.exports = router