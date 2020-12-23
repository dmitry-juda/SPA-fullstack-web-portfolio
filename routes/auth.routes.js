const {Router, response} = require('express')
const bcrypt = require('bcrypt')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const router = Router()

const config = require('config')
const ERR500 = config.get('err500')

// /api/auth/register
router.post(
    '/register',
    [
        check('username','короткий логин (минимум 3)').isLength({min: 3}),
        check('password', 'короткий пароль (минимум 6)').isLength({ min: 6 })
    ]
    , 
    async (req, res) => {

    try {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Так, стопэ. Поди-ка сюда!'
            })
        }

        const {username, password} = req.body

        const candidate = await User.findOne({ username }, (e) => {
            if(e) {
                console.log('i can not find something: ' + e.message)
            }
        })

        if (candidate) {
           return res.status(400).json({ message: 'Вася, такое мыло тут уже роняли.'})
        }
        

        const hashedPassword = await bcrypt.hash(password, 12)
        
        const user = new User({ username, password: hashedPassword})

        await user.save([], (e) => {
            if(e) {
                console.log('i can not save something: ' + e.message)
            }
            
        })

        res.status(201).json({ message: 'велком ту май асс'})

    } catch(e) {
        res.status(500).json({ message: ERR500 + 'Детали: ' + e.message})
    }
})

// /api/auth/login
router.post('/login',

[
        check('username','с таким мылом в баню нельзя').exists(),
        check('password', 'без пароля тоже нельзя').exists()
    ]
    , 
    async (req, res) => {
    try {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Так, стопэ. Поди-ка сюда!'
            })
        }

        const {username,password} = req.body

        const user = await User.findOne({ username }, (e) => {
            if(e) { console.log('i can not find something: ' + e.message) }
        })

        if(!user) {
            return res.status(400).json({ message: 'Что-то тут не так'})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch) {
            return res.status(400).json({ message: 'Неверный логин или пароль'})
        }

        const token = jwt.sign(
            { userId: user._id },
            config.get('jwtSecret'),
            { expiresIn: '1h'}
        )

        res.json({token, userId: user._id})


    } catch(e) {
        res.status(500).json({ message: ERR500 + " : " + e.message })
    }
})

module.exports = router