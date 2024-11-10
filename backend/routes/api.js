import express from "express";
const router = express.Router();
import * as FeaturesController from "../app/controllers/FeaturesController.js";
import authMiddleware from "../app/middlewares/authMiddleware.js";
import { FileUpload } from "../app/controllers/FeaturesController.js";
import { create as UserControllerCreate } from "../app/controllers/UserController.js";
import { login as UserControllerLogin } from "../app/controllers/UserController.js";
import { alluser as UserControlleralluser } from '../app/controllers/UserController.js';
import { userResetPassword as UserControlleralluserResetPassword } from '../app/controllers/UserController.js';
import { resetPassword as UserControllerallresetPassword } from '../app/controllers/UserController.js';
 


router.get("/feature1/TokenEncode", FeaturesController.TokenEncode);
router.get("/feature2/TokenDecode", FeaturesController.TokenDecode);
router.get("/feature3/Email", FeaturesController.Email);
router.get("/feature4/Profile", authMiddleware, FeaturesController.Profile);
router.get("/feature5/CreateCookies", FeaturesController.CreateCookies);
router.get("/feature6/RemoveCookies", FeaturesController.RemoveCookies);

router.post("/feature7/FileUpload", FeaturesController.FileUpload);

router.post("/user", UserControllerCreate);
router.post("/user/login", UserControllerLogin);
router.get('/alluser', authMiddleware, UserControlleralluser);

router.post('/reset-password',UserControlleralluserResetPassword)

router.post('/reset', UserControllerallresetPassword)


router.get('/verify-token', authMiddleware, (req, res) => {
    // If authMiddleware passed, token is valid
    res.status(200).json({ valid: true });
  });
  
export default router;
