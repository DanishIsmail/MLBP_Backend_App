import express, { Router } from "express";
import {
  signup,
  login,
  loginWithGoogle,
  current,
  forgetPassword,
  changePassword,
  addFollower,
  addSocialLinks,
  loginWithTwitter,
  getIsUserExist,
  updateProfile,
  updatePassword,
} from "./users.controller";
import { verifyJWT } from "../../middleware/verifyJWT";
import {
  validateAuthParams,
  validateSignupParams,
  isUserExist,
  isUserDoesNotExist,
  isUserIsValid,
  validateForgotParams,
  isRestPaswordExist,
  isRestPaswordTokenValid,
  validateUpdateParams,
  validateGoogleAuthParams,
  isGoogleAuthenticated,
  ischeckGoogleUser,
  validateMedialinkParams,
  validateTwitterAuthParams,
  isTwitterAuthenticated,
  validateUpdateProfileParams,
  validateUpdatePasswordParams,
  isOldPAsswordIsValid,
} from "./users.middleware";
const router: Router = express.Router();

// register the user
router.route("/signup").post(validateSignupParams, isUserExist, signup);

// Authenticate the user
router
  .route("/login")
  .post(
    validateAuthParams,
    isUserDoesNotExist,
    ischeckGoogleUser,
    isUserIsValid,
    login
  );

// Google Authentication
router
  .route("/GoogleAuthenticate")
  .post(validateGoogleAuthParams, isGoogleAuthenticated, loginWithGoogle);

// Twitter Authentication
router
  .route("/loginWithTwitter")
  .post(validateTwitterAuthParams, isTwitterAuthenticated, loginWithTwitter);

// Current user
router.route("/current").get(verifyJWT, current);

// Forget Password
router
  .route("/ForgetPassword")
  .post(validateForgotParams, isUserDoesNotExist, forgetPassword);

// Add Follower
router.route("/addFollower").post(verifyJWT, addFollower);

// Change Forgot Password
router
  .route("/ChangeForgotPassword/:token")
  .put(
    validateUpdateParams,
    isRestPaswordExist,
    isRestPaswordTokenValid,
    changePassword
  );

// Add Social Links
router
  .route("/addSocialLinks")
  .post(verifyJWT, validateMedialinkParams, addSocialLinks);

// Get User Exist
router.route("/GetIsUserExist").post(getIsUserExist);

// Update User Profile
router
  .route("/updateProfile")
  .post(verifyJWT, validateUpdateProfileParams, updateProfile);

// Update Account Password
router
  .route("/UpdatePassword")
  .post(
    verifyJWT,
    validateUpdatePasswordParams,
    isOldPAsswordIsValid,
    updatePassword
  );

export default router;
