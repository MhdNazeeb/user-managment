import bcrypt from "bcrypt";
import userModel from "../model/userSchema.js";
import adminModel from "../model/adminSchema.js";
import { generateToken } from "../middleware/auth.js";



export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await adminModel.findOne({ email: email});

    if (!admin) return res.status(201).json({ message: "Invalid Email " });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(202).json({ message: "Incorrect Password " });
    const { _id, name } = admin;

    const token = generateToken(_id,"admin");
    res.status(200).json({ token: token, name: name });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUser = async (req, res, next) => {
    try {
        const users = await userModel.find({},{password:0});
        res.status(200).json({ status: "success", result: users });
    } catch (error) {
        res.status(200).json({ status: "failed", message: error.message });
    }
};
export const addUser = async (req, res, next) => {
try {
    const { email, password,mobile,firstName,lastName } = req.body;
    const isUser=await userModel.findOne({email:email})
    if(isUser){
         res.sendStatus(202)
    }
    else{
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      firstName,
      email,
      lastName,
      mobile,
      password: hashedPassword,
    });
    await newUser.save();
    res.sendStatus(200);
}
  } catch (error) {
    res.sendStatus(500);
     console.log(error.message);
  }
}
export const deleteUser = async (req, res, next) => {
    try {
        const { id} = req.query
       let deleteAccount= await userModel.deleteOne({ _id: id });
       if(deleteAccount.deletedCount==1){
        const users = await userModel.find({});
        res.status(201).json({users});
       }
    }
       catch (error) {
        res.sendStatus(500);
         console.log(error.message);
      }
    }

    export const getUserDetails = async (req, res, next) => {
        try {
            const {id}=req.query
            const users = await userModel.findOne({_id:id},{password:0});
            res.status(200).json({ status: "success", result: users });
        } catch (error) {
            res.status(500).json({ status: "failed", message: error.message });
        }
    };
    export const editUser = async (req, res, next) => {
        try {
            const { userDetails,id } = req.body;
            const { email,mobile,firstName,lastName}=userDetails
           const userDetail= await userModel.findOneAndUpdate({_id:id},{email,mobile,firstName,lastName},{new:true})
           if(userDetail)
            res.status(201).json({result:userDetail});
        
          } catch (error) {
            res.sendStatus(500);
             console.log(error.message);
          }
        }