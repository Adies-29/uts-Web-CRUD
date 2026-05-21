import express from  "express";
import { delatePembicaraById, getPembicara, savePembicara, showPembicaraById, updatePembicaraById } from "../controllers/pembicaraControllers.js";

const router = express.Router();

router.get("/", getPembicara);
router.post("/", savePembicara);
router.get("/:id", showPembicaraById);
router.put("/:id", updatePembicaraById);
router.delete("/:id", delatePembicaraById)

export default router;