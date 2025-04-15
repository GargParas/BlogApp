const express = require('express')
const pool = require('../utils/db')
const result = require('../utils/result')

const router = express.Router()

router.post('/addBlog', (req, res) => {
    const { title, content, cId } = req.body
    const sql = `INSERT INTO blog(title, contents, uId, cId) VALUES (?, ?, ?, ?)`
    pool.query(sql, [title, content, req.headers.userId, cId], (error, data) => {
        res.send(result.createResult(error, data))
    })
})

router.get('/viewAllBlogs', (req, res) => {
    const sql = `SELECT b.bId as bId, 
    b.title as title, 
    c.title as category,
    DATE_FORMAT(b.createdTimestamp, '%d-%m-%Y %H:%i:%s') AS date,
    u.fullName as author FROM blog b, categories c, user u 
    where b.uId = u.uId AND b.cId = c.cId`
    pool.query(sql, (error, data) => {
        res.send(result.createResult(error, data))
    })
})

router.get('/viewMyBlogs', (req, res) => {
    const sql = `SELECT b.bId as bId, 
    b.title as title, 
    c.title as category,
    DATE_FORMAT(b.createdTimestamp, '%d-%m-%Y %H:%i:%s') AS date,
    u.fullName as author FROM blog b, categories c, user u 
    where b.uId = u.uId AND b.cId = c.cId AND u.uId = ?`
    pool.query(sql,[req.headers.userId], (error, data) => {
        res.send(result.createResult(error, data))
    })
})

router.get('/:bId',(req,res)=>{
    const {bId} = req.params
    const sql = `select b.title,b.contents,c.title as category,c.cId,u.fullName as author,DATE_FORMAT(b.createdTimestamp, '%d-%m-%Y %H:%i:%s') AS date from blog b,categories c,user u where b.bId = ? and c.cId = b.cId and u.uId = b.uId`
    pool.query(sql,[bId],(error,data)=>{
        res.send(result.createResult(error,data))
    })
})


router.put('/editBlog', (req, res) => {
    const {title, content, cId, bId} = req.body
    const sql = `UPDATE blog SET title = ?, contents = ?, cId = ?, createdTimestamp = CURRENT_TIMESTAMP WHERE bId = ?`
    pool.query(sql, [title, content, cId, bId], (error, data) => {
        res.send(result.createResult(error, data))
    })
})


router.delete('/:bId', (req,res) => {
    const {bId} = req.params
    const sql = `DELETE FROM blog WHERE bId = ?`
    pool.query(sql, [bId], (error, data) => {
        res.send(result.createResult(error, data))
    })
})
module.exports = router