const express = require("express");
const path = require("path");
const User = require("../model/user");
const router = express.Router();
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const dotenv = require("dotenv");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Create User Route
router.post(
  "/create-user",
  upload.single("file"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      const userEmail = await User.findOne({ email });

      if (userEmail) {
        const filename = req.file.filename;
        const filePath = `uploads/${filename}`;
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
            res.status(500).json({ message: "Error deleting file" });
          }
        });
        return next(new ErrorHandler("User already exists", 400));
      }

      const filename = req.file.filename;
      const fileUrl = path.join(filename);

      const user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        avatar: fileUrl,
      };

      // Create a customer in Stripe
      const stripeCustomer = await stripe.customers.create({
        email: email,
        name: `${user.firstName} ${user.lastName}`,
      });

      // Store the Stripe customer ID in your user record
      user.stripeCustomerId = stripeCustomer.id;

      const activationToken = createActivationToken(user);
      const activationUrl = `${process.env.FRONTEND_URL}/activation?activation_token=${activationToken}`;

      try {
        await sendMail({
          email: user.email,
          subject: "Eventify Account Activation",
          message: `Hello ${user.firstName} ${user.lastName}, please click on the link to activate your account: ${activationUrl}`, // Plain text fallback
          html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd;">
        <h1 style="color: #333;">Hello ${user.firstName} ${user.lastName},</h1>
        <p style="color: #555;">Welcome to Eventify! To complete your registration, please activate your account by clicking the button below:</p>
        <p style="text-align: center;">
          <a href="${activationUrl}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">
            Activate Your Account
          </a>
        </p>
        <p style="color: #555;">If the button above does not work, copy and paste the following link into your web browser:</p>
        <p style="word-break: break-all; color: #007bff;">${activationUrl}</p>
        <p style="color: #555;">Thank you for joining Eventify!</p>
        <p style="color: #999;">If you did not sign up for this account, you can safely ignore this email.</p>
      </div>
    `,
        });
        res.status(201).json({
          success: true,
          message: "Please check your email to activate your account!",
        });
      } catch (error) {
        console.log(error.message, "error in sending mail");
        return next(new ErrorHandler(error.message, 500));
      }

      // try {
      //   jwt.sign({ user }, process.env.JWT_SECRET_KEY, (err, token) => {
      //     if (err) {
      //       return next(new ErrorHandler("Failed to generate token", 500));
      //     }
      //     sendToken(user, 201, res);
      //   });
      //   await User.create(user);
      //   res.status(201).json({
      //     success: true,
      //     message: "User created successfully!",
      //   });
      // } catch (error) {
      //   console.log(error.message, "error in sending mail");
      //   return next(new ErrorHandler(error.message, 500));
      // }
    } catch (error) {
      console.log(error.message, "error in creating user");
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "10m",
  });
};

// activate user
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      console.log(activation_token, "activation token");
      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newUser) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const { firstName, lastName, email, password, avatar } = newUser;

      let user = await User.findOne({ email });

      if (user) {
        return next(new ErrorHandler("User already exists", 400));
      }
      user = await User.create({
        firstName,
        lastName,
        email,
        avatar,
        password,
      });

      sendToken(user, 201, res);
    } catch (error) {
      console.log(error.message, "error in activation");
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// // login user
router.post(
  "/login-user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide the all fields!", 400));
      }

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User doesn't exists!", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Password is incorrect, please provide the correct password", 400)
        );
      }

      // Check if the user has a Stripe customer ID
      if (!user.stripeCustomerId) {
        // Create a customer in Stripe
        const stripeCustomer = await stripe.customers.create({
          email: email,
          name: `${user.firstName} ${user.lastName}`,
        });
        // Store the Stripe customer ID in your user record
        user.stripeCustomerId = stripeCustomer.id;
        await user.save();
      }

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// load user
router.get(
  "/getuser",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return next(new ErrorHandler("User doesn't exists", 400));
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// // log out user
router.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.status(201).json({
        success: true,
        message: "Log out successful!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// // update user info
router.put(
  "/update-user-info",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password, aboutMe, phoneNumber, firstName, lastName } =
        req.body;

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User not found", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler(
            "Password is incorrect, please provide the correct password",
            400
          )
        );
      }

      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.aboutMe = aboutMe;
      user.phoneNumber = phoneNumber;

      await user.save();

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// // update user avatar
router.put(
  "/update-avatar",
  isAuthenticated,
  upload.single("image"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      // TODO: UnLink the previous avatar from the server uploads folder
      // const existsUser = await User.findById(req.user.id);
      // const existAvatarPath = `uploads/${existsUser.avatar}`;
      // fs.unlinkSync(existAvatarPath);

      const fileUrl = path.join(req.file.filename);

      const user = await User.findByIdAndUpdate(req.user.id, {
        avatar: fileUrl,
      });

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// // update user addresses
// router.put(
//   "/update-user-addresses",
//   isAuthenticated,
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const user = await User.findById(req.user.id);

//       const sameTypeAddress = user.addresses.find(
//         (address) => address.addressType === req.body.addressType
//       );
//       if (sameTypeAddress) {
//         return next(
//           new ErrorHandler(`${req.body.addressType} address already exists`)
//         );
//       }

//       const existsAddress = user.addresses.find(
//         (address) => address._id === req.body._id
//       );

//       if (existsAddress) {
//         Object.assign(existsAddress, req.body);
//       } else {
//         // add the new address to the array
//         user.addresses.push(req.body);
//       }

//       await user.save();

//       res.status(200).json({
//         success: true,
//         user,
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );

// // delete user address
// router.delete(
//   "/delete-user-address/:id",
//   isAuthenticated,
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const userId = req.user._id;
//       const addressId = req.params.id;

//       console.log(addressId);

//       await User.updateOne(
//         {
//           _id: userId,
//         },
//         { $pull: { addresses: { _id: addressId } } }
//       );

//       const user = await User.findById(userId);

//       res.status(200).json({ success: true, user });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );

// // update user password
router.put(
  "/update-user-password",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).select("+password");

      const isPasswordMatched = await user.comparePassword(
        req.body.oldPassword
      );

      if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect!", 400));
      }

      if (req.body.newPassword !== req.body.confirmPassword) {
        return next(
          new ErrorHandler("Password doesn't matched with each other!", 400)
        );
      }
      user.password = req.body.newPassword;

      await user.save();

      res.status(200).json({
        success: true,
        message: "Password updated successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// // find user infoormation with the userId
router.get(
  "/user-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// // all users --- for admin
router.get(
  "/admin-all-users",
  isAuthenticated,
  isAdmin("admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const users = await User.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        users,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// // delete users --- admin
// TODO Test this route not tested yet
router.delete(
  "/delete-user/:id",
  isAuthenticated,
  isAdmin("admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return next(
          new ErrorHandler("User is not available with this id", 400)
        );
      }

      await User.findByIdAndDelete(req.params.id);

      res.status(201).json({
        success: true,
        message: "User deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Admin Update User
router.put(
  "/update-user/:id",
  isAuthenticated,
  isAdmin("admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return next(new ErrorHandler("User not found", 400));
      }

      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.email = req.body.email;
      user.role = req.body.role;
      user.address = req.body.address;
      user.avatar = req.body.avatar;

      await user.save();

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// block user from creating event

router.put(
  "/block-user-from-creating-event/:id",
  isAuthenticated,
  isAdmin("admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return next(new ErrorHandler("User not found", 400));
      }

      user.blockUserFromCreatingEvent = !user.blockUserFromCreatingEvent;

      await user.save();

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
