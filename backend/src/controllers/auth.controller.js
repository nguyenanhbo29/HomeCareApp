const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  changePassword,
} = require("../services/auth.service");

/**
 * Register
 */
async function register(req, res) {
  try {
    const result = await registerUser(req.body);

    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

/**
 * Login
 */
async function login(req, res) {
  try {
    const result = await loginUser(req.body);

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      data: result,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
}

/**
 * Get Profile
 */
async function profile(req, res) {
  try {
    const result = await getProfile(req.user.id);

    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully.",
      data: result,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
}

/**
 * Update Profile
 */
async function updateProfileHandler(req, res) {
  try {
    const result = await updateProfile(req.user.id, req.body);

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

/**
 * Change Password
 */
async function changePasswordHandler(req, res) {
  try {
    const { oldPassword, newPassword } = req.body;

    await changePassword(req.user.id, oldPassword, newPassword);

    return res.status(200).json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  register,
  login,
  profile,
  updateProfile: updateProfileHandler,
  changePassword: changePasswordHandler,
};
