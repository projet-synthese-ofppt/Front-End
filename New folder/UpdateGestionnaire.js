
import db from '../databaseconnection.js'
import dotenv from 'dotenv';
import multer from 'multer';
import getUserIdFromToken from '../idExtractionFromToken.js';
dotenv.config();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
        console.log("storage1")
    },
    filename: function (req, file, cb) {
        cb(null, file.filename); 
        console.log(file.filename)
    }
});


const upload = multer({ storage: storage }).single('image');
const updateGestionnaire = async (req,res)=>{
 
 
         const imagePath = req.file ? req.file.filename :data.imageOldPath ; 
   
    console.log("on update controller  ")
    
    
  console.log(imagePath)
   
    if ( !data.firstName || !data.lastName|| !data.email || !data.password ) {
        console.log('error1')
        return res.status(400).json({ message: 'All fields are required' });
    }
   const data=req.body

   const authHeader = req.headers["authorization"];

   if (!authHeader) {
       return res.status(401).json({ message: 'Unauthorized. Please log in.' });
   }
   const token = authHeader.split(' ')[1];
   const actionMakerId = await getUserIdFromToken(token);

    try{
        const sql='UPDATE person SET first_name=?,last_name=?,login=?,password=?,image=? WHERE person_id=?';
        const values=[data.firstName, data.lastName,data.email,data.password,imagePath,data.userId];
        console.log(values)
        const [Result]= await db.query(sql,values);
       
        console.log(Result)
        const journalSql="insert into journaladmin (Actor,Effected,action_type,action_details) values (?,?,?,?)"
        const journalValues = [actionMakerId, data[0],"Update",`Admin ${actionMakerId} a modifier le gestionnaire avec l'ID ${ data[0]}`];
        const [journalInput] = await db.query(journalSql,journalValues);
        console.log("Journal Updated")
       
       
        if(Result.length===0){
           
            return res.status(401).json({message:"No user found "})  
        }
        else{
          
            
          return  res.status(200).json({message:"User Updated succesfully"})

        }
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"no user was found"})

    }
}
export default updateGestionnaire;