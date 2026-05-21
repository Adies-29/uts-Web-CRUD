import { Request, Response  } from "express";
import { Event  } from "../types/event.js";
import { prisma } from "../lib/db.js"

let events: Event[] = [];


//1. menampilkan Event
export const getEvents = async (req: Request, res: Response) => {
   
   try {
    const allEvents = await prisma.event.findMany({
        include: {
        category: true,   
        pembicara: true,  
    },
        orderBy: {
            createdAt: "desc",
        },
    });

    //tampilkan data
    // res.json(allEvents);
    res.status(200).json({message : "Data berhasil ditampilkan", event: (allEvents)});
    
   } catch (error) {

    // jika error
    res.status(500).json({
        message : "Error Boss",
        error,
    });
    
   }
};

// menyimpan data event
export const saveEvents = async (req: Request, res: Response) => {
    try {
        const { name, categoryId,pembicaraId, location, dateEvent, description } = req.body;
        
        if (!name || !categoryId || !pembicaraId || !location || !dateEvent || !description) {
            return res.status(400).json({
                message: "Semua field wajib diisi",
            });
        }
        const newEvent = await prisma.event.create({
            data: {
                name,
                categoryId,
                pembicaraId,
                location,
                dateEvent: new Date(dateEvent),
                description,
            },
        });
        res.status(201).json({
            message: "Event berhasil dibuat",
            data: newEvent,
        });
    } catch (error) {
        res.status(500).json({
            message: "Gagal membuat event",
            error,
        });
    }


};          

// menampilkan data event berdasrkan id
export const showEventById = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const id = Number(req.params.id);
        const event = await prisma.event.findUnique({
            where: { id },
        });
        if (!event) {
            return res.status(404).json({
                message: "Event tidak ditemukan",
            });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({
            message: "Gagal mengambil detail event",
            error,
        });
    }

};

// mengupdate event berdasrkan id
export const updateEventById = async (req: Request<{ id: string }>, res: Response) => {
   try {
        const id = Number(req.params.id);
        const existingEvent = await prisma.event.findUnique({
            where: { id },
        });
        if (!existingEvent) {
            return res.status(404).json({
                message: "Event tidak ditemukan",
            });
        }
        const { name, categoryId,pembicaraId, location, dateEvent, description } = req.body;
        const updatedEvent = await prisma.event.update({
            where: { id },
            data: {
                name: name ?? existingEvent.name,
                categoryId: categoryId ?? existingEvent.categoryId,
                pembicaraId: pembicaraId ?? existingEvent.pembicaraId,
                location: location ?? existingEvent.location,
                dateEvent: dateEvent ? new Date(dateEvent) : existingEvent.dateEvent,
                description: description ?? existingEvent.description,
            },
        });
        res.json({
            message: "Event berhasil diupdate",
            data: updatedEvent,
        });
    } catch (error) {
        res.status(500).json({
            message: "Gagal update event",
            error,
        });
    }


};

// menghapus event berdasarkan id
export const deleteEventById = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const id = Number(req.params.id);
        const existingEvent = await prisma.event.findUnique({
            where: { id },
        });
        if (!existingEvent) {
            return res.status(404).json({
                message: "Event tidak ditemukan",
            });
        }
        await prisma.event.delete({
            where: { id },
        });
        res.json({
            message: `Event id:${id} berhasil dihapus`,
        });
    } catch (error) {
        res.status(500).json({
            message: "Gagal menghapus event",
            error,
        });
    }


};