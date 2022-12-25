import express from "express";
import {
  getAllBooks,
  addBook,
  getBook,
  deleteBook,
  updateBook,
} from "../controllers/books.js";
const router = express.Router();

router.route("/").get(getAllBooks).post(addBook);
router.route("/:id/").get(getBook).delete(deleteBook).patch(updateBook);
router.get("/dummy",async (req,res)=>{
res.send('cool');
})

export default router;
