import { Request, Response, NextFunction } from "express";
import { errorResponse, successResponse } from "../../utilities/responses";
import {
  createUserService,
  getUserByEmail,
  getUserByEmailDetails,
  getUserById,
  getUserByIdDetails,
  getGoogleUserBy,
  getTwitterUserBy,
} from "./users.service";
import { IUserAttrs } from "./users.types";
import {
  userAddedSuccess,
  loginSuccess,
  currentUserSuccess,
  passwordUpdateSuccess,
  forgetPasswordSuccess,
  followerUpdateSuccess,
  userUpdatedSuccess,
} from "../../utilities/errorMessages";
import {
  forgotUsersPasword,
  deleteUsersPasword,
} from "../usersPasword/usersPasword.service";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// @desc      Register User
// @route     POST /api/v1/auth/signup
// @access    Public
const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      email,
      password,
      userName,
      address,
      bio,
      dob,
      city,
      publicKey,
      secretKey,
    } = req.body as {
      email: string;
      password: string;
      userName: string;
      address: string;
      bio: string;
      dob: string;
      city: string;
      publicKey: string;
      secretKey: string;
    };

    //Generate hash of new password and update admin
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    let user: IUserAttrs = {
      email,
      password: hashedPass,
      userName,
      address,
      bio,
      dob,
      city,
      publicKey,
      secretKey,
      isVerfiedAccount: true,
      isEmailVerfied: true,
    };

    let result = await createUserService(user);
    if (!result) {
      return res
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    }
    return successResponse(res, 200, userAddedSuccess, {
      userName: result?.userName,
      email: result?.email,
    });
  } catch (error) {
    next(error);
  }
};

// @desc      Authenticate User
// @route     POST/api/v1/auth/login
// @access    Public
const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body as { email: string; password: string };

    let userData = await getUserByEmailDetails(email);
    let user = {
      id: userData?._id,
      userName: userData?.userName,
      email: userData?.email,
      roles: userData?.roles,
    };

    if (!process.env.ACCESS_TOKEN_SECRET) {
      return errorResponse(res, 400, "Internal server error");
    }
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "60m",
    });
    return successResponse(res, 200, loginSuccess, {
      accessToken: accessToken,
      data: userData,
    });
  } catch (error) {
    next(error);
  }
};

// @desc      Current User
// @route     GET/api/v1/auth/current
// @access    Public
const current = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //@ts-ignore
    let id = req.user?.id;
    const user = await getUserByIdDetails(id);
    return successResponse(res, 200, currentUserSuccess, {
      data: user,
    });
  } catch (error) {
    console.log("error==>", error);
    next(error);
  }
};

// @desc      Change Password
// @route     PUT/api/v1/auth/ChangePassword
// @access    Public
const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { newPassword } = req.body;
    //@ts-ignore
    let email = req.user;
    const user = await getUserByEmail(email);

    if (!user) {
      return res
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    }
    //Generate hash of new password and update user
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(newPassword, salt);
    //update user
    user.password = hashedPass;
    user.save();
    const response = await deleteUsersPasword(email, "Forgot");
    return successResponse(res, 200, passwordUpdateSuccess, {
      userName: user.userName,
      email: user.email,
    });
  } catch (error) {
    console.log("error==>", error);
    next(error);
  }
};

// @desc      Forget Password
// @route     POST/api/v1/auth/ForgetPassword
// @access    Public
const forgetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    const user = await getUserByEmail(email);
    if (!user) {
      return res
        .status(500)
        .json({ success: false, error: "User Does not exist" });
    }
    let forget = await forgotUsersPasword(email);
    return successResponse(res, 200, forgetPasswordSuccess, {
      email: email,
    });
  } catch (error) {
    console.log("error==>", error);
    next(error);
  }
};

// @desc      Update Password
// @route     PUT/api/v1/auth/UpdatePassword
// @access    Public
const updatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { newPassword } = req.body as {
      newPassword: string;
    };
    //@ts-ignore
    let email = req.user?.email;
    const user = await getUserByEmail(email);

    if (!user) {
      return res
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    }

    //Generate hash of new password and update user
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(newPassword, salt);
    //update user
    user.password = hashedPass;
    user.save();
    return successResponse(res, 200, passwordUpdateSuccess, {
      userName: user.userName,
      email: user.email,
    });
  } catch (error) {
    console.log("error==>", error);
    next(error);
  }
};

// @desc     Google Authentication
// @route     POST/api/v1/auth/GoogleAuthenticate
// @access    Public
const loginWithGoogle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, firstName, lastName, password } = req.body as {
      email: string;
      firstName: string;
      lastName: string;
      password: string;
    };

    let userData = await getGoogleUserBy(email, true);
    if (!userData) {
      //Generate hash of new password and update admin
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password, salt);
      let user: IUserAttrs = {
        email,
        password: hashedPass,
        userName: firstName,
        isVerfiedAccount: true,
        isEmailVerfied: true,
        isGoogle: true,
      };

      userData = await createUserService(user);
    }
    let user = {
      id: userData?._id,
      userName: userData?.userName,
      email: userData?.email,
      roles: userData?.roles,
    };

    if (!process.env.ACCESS_TOKEN_SECRET) {
      return errorResponse(res, 400, "Internal server erro");
    }
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "60m",
    });
    return successResponse(res, 200, loginSuccess, {
      accessToken: accessToken,
      data: userData,
    });
  } catch (error) {
    next(error);
  }
};

// @desc     Twitter Authentication
// @route     POST/api/v1/auth/loginWithTwitter
// @access    Public
const loginWithTwitter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, firstName, lastName, password } = req.body as {
      email: string;
      firstName: string;
      lastName: string;
      password: string;
    };

    let userData = await getTwitterUserBy(email, true);
    if (!userData) {
      //Generate hash of new password and update admin
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password, salt);
      let user: IUserAttrs = {
        email,
        password: hashedPass,
        userName: firstName,
        isVerfiedAccount: true,
        isEmailVerfied: true,
        isTwitter: true,
      };

      userData = await createUserService(user);
    }
    let user = {
      id: userData?._id,
      userName: userData?.userName,
      email: userData?.email,
      roles: userData?.roles,
    };

    if (!process.env.ACCESS_TOKEN_SECRET) {
      return errorResponse(res, 400, "Internal server erro");
    }
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "60m",
    });
    return successResponse(res, 200, loginSuccess, {
      accessToken: accessToken,
      data: userData,
    });
  } catch (error) {
    next(error);
  }
};

// @desc      Add Follower
// @route     POST/api/v1/auth/AddFollower
// @access    Public
const addFollower = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //@ts-ignore
    let email = req.user.email;
    const user = await getUserByEmail(email);

    if (!user) {
      return res
        .status(500)
        .json({ success: false, error: "User does not exist in our database" });
    }

    //@ts-ignore
    user.followersCount += 1;
    user.save();
    return successResponse(res, 200, followerUpdateSuccess, {
      userName: user.userName,
      email: user.email,
      followersCount: user.followersCount,
    });
  } catch (error) {
    console.log("error==>", error);
    next(error);
  }
};

// @desc      Add Social Links
// @route     POST/api/v1/auth/addSocialLinks
// @access    Public
const addSocialLinks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { faceBookLink, twitterLink, instagramLink, yourSiteLink } =
      req.body as {
        faceBookLink: string;
        twitterLink: string;
        instagramLink: string;
        yourSiteLink: string;
      };
    //@ts-ignore
    let email = req.user.email;
    const user = await getUserByEmail(email);

    if (!user) {
      return res
        .status(500)
        .json({ success: false, error: "User does not exist in our database" });
    }

    //@ts-ignore
    if (faceBookLink) {
      user.faceBookLink = faceBookLink;
    }
    if (twitterLink) {
      user.twitterLink = twitterLink;
    }
    if (instagramLink) {
      user.instagramLink = instagramLink;
    }
    if (yourSiteLink) {
      user.yourSiteLink = yourSiteLink;
    }
    user.save();
    return successResponse(res, 200, followerUpdateSuccess, {
      userName: user.userName,
      email: user.email,
      faceBookLink: user.faceBookLink,
      twitterLink: user.twitterLink,
      instagramLink: user.instagramLink,
      yourSiteLink: user.yourSiteLink,
    });
  } catch (error) {
    console.log("error==>", error);
    next(error);
  }
};

// @desc      Get User Exist
// @route     POST/api/v1/auth/GetIsUserExist
// @access    Public
const getIsUserExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { email } = req.body as {
      email: string;
    };
    const user = await getUserByEmailDetails(email);
    let isUserExist;

    if (!user) {
      isUserExist = false;
    } else {
      isUserExist = true;
    }
    return successResponse(res, 200, currentUserSuccess, {
      isUserExist,
      email,
    });
  } catch (error) {
    console.log("error==>", error);
    next(error);
  }
};

// @desc      Update User Profile
// @route     POST /api/v1/auth/updateProfile
// @access    Public
const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //@ts-ignore
    let id = req.user?.id;
    const { first_name, last_name, userName, bio, location } = req.body as {
      first_name: string;
      last_name: string;
      userName: string;
      location: string;
      bio: string;
    };

    const users = await getUserByIdDetails(id);
    if (!users) {
      return errorResponse(res, 400, "user does not exist");
    }

    if (first_name) {
      users.firstName = first_name;
    }
    if (last_name) {
      users.lastName = last_name;
    }
    if (userName) {
      users.userName = userName;
    }
    if (location) {
      users.city = location;
    }
    if (bio) {
      users.bio = bio;
    }

    users.save();
    return successResponse(res, 200, userUpdatedSuccess, {
      user: users,
    });
  } catch (error) {
    next(error);
  }
};

export {
  signup,
  login,
  loginWithGoogle,
  loginWithTwitter,
  current,
  changePassword,
  forgetPassword,
  addFollower,
  addSocialLinks,
  getIsUserExist,
  updateProfile,
  updatePassword,
};
