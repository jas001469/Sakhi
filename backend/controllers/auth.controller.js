import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const signup = async (req, res) => {

    const { email, password, name } = req.body;

    try{
        if(!email || !password || !name) {
            throw new Error("Please provide all fields");
        }
        const userAlreadyExists = await User.findOne({email}); 

        if(userAlreadyExists){ 
           return res.status(400).json({success:false, message:"User already exists"}); 
        } 
        const hashedPassword = await bcrypt.hash(password, 10); 

        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString(); 

        const user = new User({ 
            email,
            password:hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours 
        });

        await user.save();

        generateTokenAndSetCookie(res,user._id);

        res.status(201).json({
            success:true, 
            message:"User created successfully", 
            user:  {
                ...user._doc, 
                password: undefined
            }
        });
    }
        catch(error){
            res.status(400).json({success:false, message:error.message});
        }
}

export const login = async (req,res)=>{
    const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}

		generateTokenAndSetCookie(res, user._id);

		user.lastLogin = new Date();
		await user.save();

		res.status(200).json({
			success: true,
			message: "Logged in successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		console.log("Error in login ", error);
		res.status(400).json({ success: false, message: error.message });
	}
}

export const logout = async (req, res) => {
	res.clearCookie("token");
	res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const checkAuth = async (req, res) => {
	try {
		const user = await User.findById(req.userId).select("-password");
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};