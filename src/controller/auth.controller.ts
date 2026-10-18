import type { Request, Response } from 'express';
import { AuthService } from "../services/auth.service";

const authService = new AuthService(); 

export class AuthController {
    
    register = async (req: Request, res: Response) => {
       try {
        const {businessId, name, email, password, role} = req.body;
        const user = await authService.register({
            businessId,
            name,
            email,
            password,
            role,
        }) 
        
        return res.status(201).json({
            succes: true,
            message: 'User created succesfully',
            data: user,
        })

       } catch (error: any) {
          return res.status(400).json({
            succes: false,
            message: error.message || 'Something went wrong',
          });
       }
    }

    login = async (req: Request, res: Response) => {
       try {
        const {email, password} = req.body;
        const result = await authService.login(email, password);

        return res.status(201).json({
            succes: true,
            message: "Login succesfully",
            data: result,
        })
       
    } catch (error: any) {
        return res.status(401).json({
            succes: false,
            message: error.message || 'Authentication error'
        })
    }  
    }
}