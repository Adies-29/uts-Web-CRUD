import express  from "express";
import { deleteEventById, getEvents, saveEvents, showEventById, updateEventById } from "../controllers/eventControllers.js";

const router = express.Router();

router.get("/", getEvents);
router.post("/", saveEvents);
router.get("/:id", showEventById);
router.put("/:id", updateEventById);
router.delete("/:id", deleteEventById)


export default router;
