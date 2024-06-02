
import fs from 'fs';
import path from 'path';
import db from '../../databaseconnection.js';
import dotenv from 'dotenv';
import multer from 'multer';
dotenv.config();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        cb(null, file.filename); 
        
    }
});


const upload = multer({ storage: storage }).single('image');


const addGestionnaire = async(req, res) => {
    console.log(upload);
   
console.log("on add controller");
console.log(req.body)
console.log(req.file)
        const { firstName, lastName, email, password } = req.body;
        const imagePath = req.file ? req.file.filename : null; 

        if (!firstName || !lastName || !email || !password || !imagePath) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        try {
            const sql = 'INSERT INTO person (first_name, last_name, login, password, image, profil) VALUES (?, ?, ?, ?, ?, ?)';
            await db.query(sql, [firstName, lastName, email, password, imagePath, "gestionnaire"]);
           
            console.log('Data saved to database');
            res.status(200).json({ message: 'Data saved successfully' });
        } catch (err) {
            console.error('Error saving data to database:', err);
            res.status(500).json({ message: 'Error saving data to database' });
        }
   
};

export default addGestionnaire;
