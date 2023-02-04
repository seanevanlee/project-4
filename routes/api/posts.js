import express from "express";
const router = express.Router();
import postsCtrl from "../../controllers/posts.js";
import multer from "multer";
const upload = multer();

router.post("/", upload.single("photo"), postsCtrl.create);
router.get("/", postsCtrl.index);
router.put("/:id", upload.single("photo"), postsCtrl.update);
router.delete("/:id", postsCtrl.deleteHero);
export default router;
