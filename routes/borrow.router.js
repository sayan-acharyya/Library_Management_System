import express from "express";
import {borrowedBooks,getBorroowedBookedForAdmin,recordBorrowedBook,returnBorrowBook} from "../controllers/borrow.controller.js"
import { isAuthenticated,isAuthorized } from "../middlewares/authMiddleware.js";
const router = express.Router();


router.post("/record-borrow-book/:id",isAuthenticated,isAuthorized("Admin"),recordBorrowedBook);

router.get("/borrowed-books-by-users",isAuthenticated,isAuthorized("Admin"),getBorroowedBookedForAdmin);

router.get("/my-borrowed-books",isAuthenticated,borrowedBooks);

router.put("/return-borrowed-book/:bookId",isAuthenticated,isAuthorized("Admin"),returnBorrowBook)

export default router;
