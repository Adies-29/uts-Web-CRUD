import { Request, Response  } from "express";
import { Category  } from "../types/category.js";
import { prisma } from "../lib/db.js"

let categories: Category  [] = [];


//1. menampilkan Event
export const getCategory = async (req: Request, res: Response) => {
    // mengambil data dari data base
   try {
    const allEvents = await prisma.category.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

    //tampilkan data
    // res.json(allEvents);
    res.status(200).json({message : "Data berhasil ditampilkan", categories: (allEvents)});
    
   } catch (error) {

    // jika error
    res.status(500).json({
        message : "Error Boss",
        error,
    });
    
   }
};

// menyimpan data event
export const saveCategory = async (req: Request, res: Response) => {
    const {name} = req.body;
    
        // validasi sederhana
        if(!name) {
            res.status(500).json({message: "yaa erorr"})
        }
        //validasi berhsail
        const newCategory = await prisma.category.create({
            data:{
                name,
            },
        });
    
        //jika data berhasil disimpan
        res.status(200).json({message : "Data berhasil disimpan", event: newCategory});
        
        
}

// menampilkan data category berdasrkan id
export const showCategoryById = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const id = Number(req.params.id);
        const category = await prisma.category.findUnique({
            where: { id },
        });
        if (!category) {
            return res.status(404).json({
                message: "Category tidak ditemukan",
            });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({
            message: "Gagal mengambil detail Category",
            error,
        });


    };
};

// mengupdate category berdasrkan id
export const updateCategoryById = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const id = Number(req.params.id);
        const existingCategory = await prisma.category.findUnique({
            where: { id },
        });
        if (!existingCategory) {
            return res.status(404).json({
                message: "Category tidak ditemukan",
            });
        }
        const { name } = req.body;
        const updatedCategory = await prisma.category.update({
            where: { id },
            data: {
                name: name ?? existingCategory.name,
            },
        });
        res.json({
            message: "Category berhasil diupdate",
            data: updatedCategory,
        });
    } catch (error) {
        res.status(500).json({
            message: "Gagal update Category",
            error,
        });
    }

};

// menghapus category berdasarkan id
export const deleteCategoryById = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const id = Number(req.params.id);
        const existingCategory = await prisma.category.findUnique({
            where: { id },
        });
        if (!existingCategory) {
            return res.status(404).json({
                message: "Category tidak ditemukan",
            });
        }
        await prisma.category.delete({
            where: { id },
        });
        res.json({
            message: `Category ${id} berhasil dihapus`,
        });
    } catch (error) {
        res.status(500).json({
            message: "Gagal menghapus category",
            error,
        });
    }

};