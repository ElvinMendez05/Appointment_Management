import type { UserRole } from "../../generated/prisma/enums";
import {prisma} from "../libs/client"

export class AuthRepository {
    
    findByEmail = async (email: string) => {
        return await prisma.user.findUnique({
            where: {email},
            include: {business: true},
        })
    }

    findById = async (id: string) => {
        return await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                isActive: true,
                businessId: true,
                createdAt: true,
            },
        });
    }
    
    createUser = async (data: {
        businessId: string;
        name: string;
        email: string;
        password: string;
        role?: UserRole; 
    }) => {
        return await prisma.user.create({
            data,
        });
    }
}