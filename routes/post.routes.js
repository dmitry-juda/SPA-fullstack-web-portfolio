const {Router, response} = require('express')
const {body, validationResult} = require('express-validator')
const auth = require('../middleware/auth.middleware')

const router = Router()

const mongoose = require('mongoose')


const config = require('config')
const ERR500 = config.get('err500')

router.post('/new', auth,     
    [
        body('name')
        .not().isEmpty()
        .trim()
        .escape().withMessage('problem with name')
        ,
        body('text')
        .not().isEmpty()
        .trim()
        .escape().withMessage('problem with text')
    ], 

    async (req,res) => {
      
        try {

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Так, стопэ. Поди-ка сюда!'
                })
            }

            //body destruct
            const {name,text} = req.body
            const Post = require('../models/Post')
    
            docPost = new Post ({
                _id: new mongoose.Types.ObjectId(),
                name: name,
                text: text
            })
    
            docPost.save((err) => {
                if (err) throw err
            })

            return res.status(201).json({ message: 'post has been created'})
    
        }
        catch(e) {
            console.log(`err: ${e.message}`)
            return res.status(400).json({ message: 'error'})
        }
    }

)
router.post('/delete', auth,    
    [
        body('_id')
        .not().isEmpty()
        .trim()
        .escape().withMessage('problem with id')
    ], 

    async (req,res) => {
      
        try {

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Так, стопэ. Поди-ка сюда!'
                })
            }


            const Post = require('../models/Post')
        
            const {_id} = req.body
    
            const post = await Post.findById(_id)

            if(post) {
                console.log(post.text)
                  deleted = await post.delete()
                    if(deleted) console.log('deleted') 
                    else console.log('not deleted')
                    return res.status(201).json({ message: 'deleted'})
            }
            else {
                console.log(`err`)
                return res.status(400).json({ message: 'error'}) 
            }
            
    
        }
        catch(e) {
            console.log(`err: ${e.message}`)
            return res.status(400).json({ message: 'error'})
        }
    }

)
module.exports = router