import { AuthRepository } from "../repositories/auth.repository";
import { generateToken } from "../utils/jwt";
import { comparePassword, hashPassword } from "../utils/password";

const userRepository = new AuthRepository()

export class AuthService {
    
    register = async (data: {
        businessId: string;
        name: string;
        email: string;
        password: string;
        role?: any;
    }) => {
        const existingUser = await userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new Error('Email already exist');
        }

        const hashedPassword = await hashPassword(data.password);
        
        const user = await userRepository.createUser({
            ...data,
            password: hashedPassword,
        })

        const {password, ...userWithoutPassword} = user;
        return userWithoutPassword;
    }

    login = async (email: string, passwordPlain: string) => {
        const user = await userRepository.findByEmail(email);
        if (!user || !user.isActive) {
            throw new Error("Invalid credentials or inactive user")
        }

        const isPassword = await comparePassword(passwordPlain, user.password);

        if (!isPassword) {
            throw new Error("Invalid credentials");
        }

        const token = generateToken({
            userId: user.id,
            businessId: user.businessId,
            role: user.role,
        })
        
        const { password, ...userWithoutPassword } = user;
        return {user: userWithoutPassword, token};
     
    }
}