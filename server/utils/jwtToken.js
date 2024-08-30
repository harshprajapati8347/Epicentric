// create token and saving that in cookies
const sendToken = (user, statusCode, res) => {
  try {
    const token = user.getJwtToken();

    // Options for cookies
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
      httpOnly: process.env.NODE_ENV === "PRODUCTION" ? false : true,
      secure: process.env.NODE_ENV === "PRODUCTION" ? true : false,
      sameSite: process.env.NODE_ENV === "PRODUCTION" ? "none" : false,
    };

    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error, "error in sendToken");
  }
};

module.exports = sendToken;
