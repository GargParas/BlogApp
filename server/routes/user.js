const express = require('express')
const cryptoJs = require('crypto-js')
const jwt = require('jsonwebtoken')

const pool = require('../utils/db')
const result = require('../utils/result')
const config = require('../utils/config')

const router = express.Router()

router.post('/register', (req, res) => {
    const {fullName, email, password, phoneNumber } = req.body
    const encryptedPassword = String(cryptoJs.SHA256(password))
    const sql = `INSERT INTO user( fullName, email, password, phoneNumber) VALUES(?, ?, ?, ?)`
    pool.query(sql, [fullName, email, encryptedPassword, phoneNumber], (error, data) => {
        res.send(result.createResult(error, data))
    })
})

router.post('/login', (req, res) => {
    const {email, password} = req.body
    const encryptedPassword = String(cryptoJs.SHA256(password))
    const sql = `SELECT uId, fullName, email, phoneNumber FROM user WHERE email = ? AND password = ?`
    pool.query(sql, [email, encryptedPassword], (error, data) => {
        if(data){
            if(data.length != 0){
                const payload = {
                    userId: data[0].uId
                }
                const token = jwt.sign(payload, config.secret)
                const body = {
                    token: token,
                    fullName: data[0].fullName
                }
                res.send(result.createSuccessResult(body))
            }else res.send(result.createErrorResult('Invalid email or password'))
        }else res.send(result.createErrorResult(error))
    })
})

module.exports = router