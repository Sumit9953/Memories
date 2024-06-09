import bcrypt from "bcrypt"
import User from "../models/User.js"
import jwt from "jsonwebtoken"

export const signup = async (req,res) => {
    try {
      console.log("req.body" , req.body);
        const {name , lastName , email , password } = req.body;

        if(!name || !lastName || !email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
        return res.status(400).json({
            success: false,
            message: "User Already exists",
        });
        }

        let hashPassword;
            try {
            hashPassword = await bcrypt.hash(password, 10);
            } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error during hasing a password",
            });
            }

    const user = await User.create({
      name,
      lastName,
      email,
      password: hashPassword,
    });

    return res.status(200).json({
      success: true,
      data: user,
      message: "User created Successfully",
    });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
          success: false,
          message: "User Not created successfully",
        });
    }
}

export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Please fill all the details",
        });
      }
  
      let user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Please signup",
        });
      }
  
      const payload = {
        email: user.email,
        id: user._id,
        role: user.role,
      };
  
      if (await bcrypt.compare(password, user.password)) {
        let token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "2h",
        });
        
        // console.log(user);
        user = user.toObject();
        user.token = token;
        // console.log(user);
        
        user.password = undefined;
  
        const options = {
          expires: new Date( Date.now() + 30000),
          httpOnly: true
        }
  
        res.cookie("token" , token , options).status(200).json({
          success:true,
          token,
          user,
          message: "User Logged in successfully"
        })
  
        // res.status(200).json({
        //   success:true,
        //   token,
        //   user,
        //   message: "User Logged in successfully"
        // })
  
      } else {
        return res.status(403).json({
          success: false,
          message: "Please enter correct password",
        });
      }
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Login failed",
      });
    }
  };