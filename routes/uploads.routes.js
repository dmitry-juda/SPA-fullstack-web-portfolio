const {Router, response} = require('express')
const {body, validationResult} = require('express-validator')
const auth = require('../middleware/auth.middleware')
const fileUpload = require('express-fileupload')

const router = Router()

const mongoose = require('mongoose')


const config = require('config')
const ERR500 = config.get('err500')

router.post('/upload/new', auth,     
    [
        body('image')
        .not().isEmpty().withMessage('problem with image')
    ], 

    async (req,res) => {
        res.starus(201).send('File uploaded!')
        // //Проверить, загрузить, присвоить id, сделать запись в бд и вернуть ссылку
        // if (!req.files || Object.keys(req.files).length === 0) {
        //     return res.status(400).send('No files were uploaded.');
        //   }
        
        //   // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        //   let sampleFile = req.files.sampleFile;
        
        //   // Use the mv() method to place the file somewhere on your server
        //   sampleFile.mv('/uploads/'+ req.files.sampleFile.name, function(err) {
        //     if (err)
        //       return res.status(500).send(err);
        
        //     res.send('File uploaded!');
        //   })
        
    }

)
router.post('/upload/delete', auth,     
    [
        body('image')
        .not().isEmpty().withMessage('problem with image')
    ], 

    async (req,res) => {

        //Проверить, найти по id, удалить, удалить запись в бд
        res.starus(201).send('File deleted!')
        
    }

)
module.exports = router