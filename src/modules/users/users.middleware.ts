import Joi, { ValidationResult } from "joi";
import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../../utilities/responses";
import {
  getUserByEmail,
  isUserExistService,
  getGoogleUserBy,
  getTwitterUserBy,
} from "./users.service";
import { checkPasswordTokenValidity } from "../usersPasword/usersPasword.service";
import bcrypt from "bcryptjs";

const validateSignupParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    userName: Joi.string().allow(""),
    email: Joi.string().email().required(),
    address: Joi.string().allow(""),
    bio: Joi.string().allow(""),
    dob: Joi.string().allow(""),
    city: Joi.string().allow(""),
    publicKey: Joi.string().allow(""),
    secretKey: Joi.string().allow(""),
    stripeAccountID: Joi.string().allow(""),
    password: Joi.string().required(),
  });

  const { error }: ValidationResult = schema.validate(req.body);
  if (error) {
    return errorResponse(
      res,
      400,
      error.details[0].message.replace(/['"]+/g, "")
    );
  }
  next();
};

const validateUpdateProfileParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    first_name: Joi.string().allow(""),
    last_name: Joi.string().allow(""),
    userName: Joi.string().allow(""),
    location: Joi.string().allow(""),
    bio: Joi.string().allow(""),
  });

  const { error }: ValidationResult = schema.validate(req.body);
  if (error) {
    return errorResponse(
      res,
      400,
      error.details[0].message.replace(/['"]+/g, "")
    );
  }
  next();
};

const validateAuthParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error }: ValidationResult = schema.validate(req.body);
  if (error) {
    return errorResponse(
      res,
      400,
      error.details[0].message.replace(/['"]+/g, "")
    );
  }
  next();
};

const validateUpdatePasswordParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
  });

  const { error }: ValidationResult = schema.validate(req.body);
  if (error) {
    return errorResponse(
      res,
      400,
      error.details[0].message.replace(/['"]+/g, "")
    );
  }
  next();
};

const isUserExist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    const query = { email };

    const result = await isUserExistService(query);

    if (result) {
      return errorResponse(res, 400, "User with this email already exist!");
    }

    next();
  } catch (error) {
    return next(error);
  }
};

const isUserDoesNotExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const query = { email };

    const result = await isUserExistService(query);

    if (!result) {
      return errorResponse(res, 400, "User does not exist in our database!");
    }

    next();
  } catch (error) {
    return next(error);
  }
};

const isUserIsValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body as {
      email: string;
      password: string;
    };
    const result = await getUserByEmail(email);

    if (!result) {
      return errorResponse(res, 400, "User does not exist in our database!");
    }

    // Ensure result.password is not undefined
    if (typeof result.password !== "string") {
      return errorResponse(res, 400, "Invalid user data!");
    }
    //verify Password
    const validPassword = await bcrypt.compare(password, result.password);

    if (!validPassword) {
      return errorResponse(res, 400, "Invalid password!");
    }

    next();
  } catch (error) {
    return next(error);
  }
};

const validateForgotParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });

  const { error }: ValidationResult = schema.validate(req.body);
  if (error) {
    return errorResponse(
      res,
      400,
      error.details[0].message.replace(/['"]+/g, "")
    );
  }
  next();
};

const validateUpdateParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    newPassword: Joi.string().required(),
  });

  const { error }: ValidationResult = schema.validate(req.body);
  if (error) {
    return errorResponse(
      res,
      400,
      error.details[0].message.replace(/['"]+/g, "")
    );
  }
  next();
};

const isRestPaswordExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.params.token) {
    return errorResponse(res, 400, "Reset token does not exist");
  }

  next();
};

const isRestPaswordTokenValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let userData = await checkPasswordTokenValidity(req.params.token);
  // @ts-ignore
  if (!userData) {
    return errorResponse(res, 400, "Token invalid or expired");
  }
  // @ts-ignore
  req.user = userData?.email;

  next();
};

const validateGoogleAuthParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { error }: ValidationResult = schema.validate(req.body);
  if (error) {
    return errorResponse(
      res,
      400,
      error.details[0].message.replace(/['"]+/g, "")
    );
  }
  next();
};

const validateTwitterAuthParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { error }: ValidationResult = schema.validate(req.body);
  if (error) {
    return errorResponse(
      res,
      400,
      error.details[0].message.replace(/['"]+/g, "")
    );
  }
  next();
};

const isGoogleAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body as {
      email: string;
    };
    const result = await getGoogleUserBy(email, false);
    if (result) {
      return errorResponse(
        res,
        400,
        "User with given email already exist with as email user or twitter user!"
      );
    }

    next();
  } catch (error) {
    return next(error);
  }
};

const isTwitterAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body as {
      email: string;
    };
    const result = await getTwitterUserBy(email, false);
    if (result) {
      return errorResponse(
        res,
        400,
        "User with given email already exist with as email user or google user!"
      );
    }

    next();
  } catch (error) {
    return next(error);
  }
};

const ischeckGoogleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body as {
      email: string;
    };
    const result = await getGoogleUserBy(email, true);
    if (result) {
      return errorResponse(
        res,
        400,
        "User with given email already exist as google user!"
      );
    }

    next();
  } catch (error) {
    return next(error);
  }
};

const validateMedialinkParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    faceBookLink: Joi.string().allow(""),
    twitterLink: Joi.string().allow(""),
    instagramLink: Joi.string().allow(""),
    yourSiteLink: Joi.string().allow(""),
  });

  const { error }: ValidationResult = schema.validate(req.body);
  if (error) {
    return errorResponse(
      res,
      400,
      error.details[0].message.replace(/['"]+/g, "")
    );
  }
  next();
};

const isOldPAsswordIsValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { oldPassword } = req.body as {
      oldPassword: string;
    };
    //@ts-ignore
    let email = req.user.email;
    const result = await getUserByEmail(email);

    if (!result) {
      return errorResponse(res, 400, "User does not exist in our database!");
    }

    // Ensure result.password is not undefined
    if (typeof result.password !== "string") {
      return errorResponse(res, 400, "Invalid user data!");
    }
    //verify old password Password
    const validPassword = await bcrypt.compare(oldPassword, result.password);

    if (!validPassword) {
      return errorResponse(res, 400, "Invalid password!");
    }

    next();
  } catch (error) {
    return next(error);
  }
};
export {
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
  isOldPAsswordIsValid,
  validateUpdatePasswordParams,
};
