const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const userValidate = require("./user.validate");

const generateHashPassword = require("../../utils/generateHashPassword");
const userValidation = require("./user.validate");

const register = async (request, response) => {
  const { first_name, last_name, username, email, phone_number, password } =
    request.body;

  const user = await new User({
    first_name,
    last_name,
    username,
    email,
    phone_number,
  });

  // validate inputs
  const userValidationError = userValidation(request.body);
  
  //   check if user exists in database or not
  const userExist = await User.findOne({ email, username });

  try {
    if (!userExist) {

      if (userValidationError) throw userValidationError;

      // Create user token
      const token = await jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "24h",
        }
      );
      user.password = generateHashPassword(password);
      user.token = token;
      user.save();

      return response.status(201).json({
        status: 201,
        message: "کاربر جدید با موفقیت ثبت شد",
        data: {
          user,
        },
      });
    } else {
      return response.status(400).json({
        status: 400,
        message: "کاربری با این ایمیل با نام کاربری قبلا ثبت نام کرده است.",
        data: [],
      });
    }
  } catch (error) {
    return response.status(500).json({
      status: 400,
      message: "خطا در ارتباط با سرور",
      data: [],
    });
  }
};

const login = async (request, response) => {
  try {
    const { username, email, password } = request.body;

    if (!username && !email && password) {
      return response.status(400).json({
        status: 400,
        message: "پر کردن تمامی فیلدها الزامی است",
        data: "",
      });
    }

    const userDetail = {
      username,
      email
    };

    // check if user send his/her username or email
    if (!userDetail.username) delete userDetail.username;
    else if(!userDetail.email) delete userDetail.email; 

    const user = await User.findOne(userDetail);
    const comparePassword = await bcrypt.compare(password, user.password);

    if (user && (comparePassword)) {
      const token = await jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "24h",
        }
      );
      user.token = token;

      return response.status(200).json({
        status: 200,
        message: "",
        data: user,
      });
    }

    return response.status(400).json({
      status: 400,
      message: "invalid credentials",
      data: "",
    });
  } catch (error) {
    return response.status(500).json({
      status: 500,
      message: "خطا در برقراری ارتباط با سرور",
      data: "",
    });
  }
};

module.exports = {
  register,
  login,
};
