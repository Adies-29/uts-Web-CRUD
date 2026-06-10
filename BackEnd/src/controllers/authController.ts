import { Request, Response } from "express";
import { prisma } from "../lib/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if ( !email || !password) {
        return res.status(400).json({
            message: "Email, dan password harus diisi!!",
        });
    }
    const existingUser = await prisma.user.findUnique({
        where: { email }
    })
    if(!existingUser){
        return res.status(401).json({
            message: "Email atau password salah!"
        });
    }
    
    const isMatch = await bcrypt.compare(password,existingUser.password);

    if (!isMatch) {
        return res.status(401).json({
            message: "Email atau password salah",
        });
    }
    const token = jwt.sign(
        {
            userId: existingUser.id,
            email: existingUser.email,
        },
        process.env.JWT_SECRET!,
        {
            expiresIn: "1D",
        }
    );

    res.status(201).json({
        message: "Login berhasil",
        token,
        user: {
            id: existingUser.id,
            email: existingUser.email,
            name: existingUser.name,
        },
    });

    return res.status(500).json({
        message: "Terjadi kesalahan server",
    });


}

export const register = async (req: Request, res: Response) => {
    //tangkap data dari user
    const { name, email, password, foto } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Nama, email, dan password harus diisi!!",
        });
    }

    // cek apakah email sudah terdaftar
    const existingUser = await prisma.user.findUnique({
        where: { email }
    })

    if (existingUser) {
        return res.status(400).json({
            message: "Email sudah terdaftar. gunakan email lain!!",
        });
    }

    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            foto,
        },
    });

    res.status(201).json({
        message: "Register berhasil",
        data: {
            email: newUser.email,
            name: newUser.name,
            foto: newUser.foto,
        }
    })
    return res.status(500).json({
        message: "Terjadi kesalahan server",
    });

}



