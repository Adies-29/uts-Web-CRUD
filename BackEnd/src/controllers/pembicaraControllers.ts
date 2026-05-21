import { Request, Response  } from "express";
import { Pembicara } from "../types/pembicara.js";
import { prisma } from "../lib/db.js"



let pembicara: Pembicara[] = [];

// menampilkan Pembicara
export const getPembicara = async (req: Request, res: Response) => {
    try {
        const allPembicara = await prisma.pembicara.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        //tampilkan data
        // res.json(allEvents);
        res.status(200).json({ message: "Data berhasil ditampilkan", pembicara: (allPembicara) });

    } catch (error) {

        // jika error
        res.status(500).json({
            message: "Error Boss",
            error,
        });

    }
};

// menyimpan data Pembicara
export const savePembicara = async (req: Request, res: Response) => {
    try {
        const { name, role, image} = req.body;
        /**
        * VALIDATION
        */
        if (!name || !role || !image ) {
            return res.status(400).json({
                message: "Semua field wajib diisi",
            });
        }
        const newPembicara = await prisma.pembicara.create({
            data: {
                name,
                role,
                image,
            },
        });
        res.status(201).json({
            message: "Pembicara berhasil dibuat",
            data: newPembicara,
        });
    } catch (error) {
        res.status(500).json({
            message: "Gagal membuat event",
            error,
        });
    }
};

// menampilkan data pembicara berdasrkan id
export const showPembicaraById = async (req: Request<{ id: string }>, res: Response ) => {
     try {
        const id = Number(req.params.id);
        const pembicara = await prisma.pembicara.findUnique({
            where: { id },
        });
        if (!pembicara) {
            return res.status(404).json({
                message: "Pembicara tidak ditemukan",
            });
        }
        res.json(pembicara);
    } catch (error) {
        res.status(500).json({
            message: "Gagal mengambil detail Pembicara",
            error,
        });
    }
};

// mengupdate pembicara berdasrkan id
export const updatePembicaraById = async (req: Request< { id: string }>, res : Response) => {
    try {
        const id = Number(req.params.id);
        const existingPembicara = await prisma.pembicara.findUnique({
            where: { id },
        });
        if (!existingPembicara) {
            return res.status(404).json({
                message: "Pembicara tidak ditemukan",
            });
        }
        const { name, role, image} = req.body;
        const updatedPembicara = await prisma.pembicara.update({
            where: { id },
            data: {
                name: name ?? existingPembicara.name,
                role: role ?? existingPembicara.role,
                image: image ?? existingPembicara.image,
            },
        });
        res.json({
            message: "Pembicara berhasil diupdate",
            data: updatedPembicara,
        });
    } catch (error) {
        res.status(500).json({
            message: "Gagal update Pembicara",
            error,
        });
    }
};


// menghapus pembicara berdasarkan id
export const delatePembicaraById = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const id = Number(req.params.id);
        const existingPembicara = await prisma.pembicara.findUnique({
            where: { id },
        });
        if (!existingPembicara) {
            return res.status(404).json({
                message: "Pembicara tidak ditemukan",
            });
        }
        await prisma.pembicara.delete({
            where: { id },
        });
        res.json({
            message: `Pembicara id:${id} berhasil dihapus`,
        });
    } catch (error) {
        res.status(500).json({
            message: "Gagal menghapus Pembicara",
            error,
        });
    }


};