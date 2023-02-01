import express from "express";
const router = express.Router();
import postsCtrl from "../../controllers/posts.js";
import multer from "multer";
const upload = multer();

router.post("/", upload.single("photo"), postsCtrl.create);
router.get("/", postsCtrl.index);
export default router;
