import bcrypt from 'bcrypt'
import User from "./user.model"
import jwt from 'jsonwebtoken'
import config from '../../app/config';


const createUserIntoDB = async (payload: Record<string, unknown>) => {
    const result = await User.create(payload);

    return result;
};


const userLogin = async (payload: {email: string, password: string}) =>{
    const user = await User.findOne({email: payload.email}).select('+password');

    if(!user){
        throw new Error('User not found');
    };

    if(user.isBlocked){
        throw new Error('This user is blocked');
    };

    const isPasswordMatch = await bcrypt.compare(
        payload.password,
        user.password
    );
    if(!isPasswordMatch){
        throw new Error('Wrong Password!!!')
    };

    const jwtpayload = {
        email: user?.email,
        password: user?.password,
        role: user?.role,
        id: user?._id,
    };


    const token = jwt.sign(jwtpayload, config.jwt_secret as string, {expiresIn: '3d'});
    

    return {token, user};
};


const getAllUser = async () =>{
    const result = await User.find();
    
    return result;
};



export const userService = {
    createUserIntoDB,
    userLogin,
    getAllUser,
}