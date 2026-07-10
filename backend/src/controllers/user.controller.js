const User = require("../models/User");

/**
 * List all users with optional search
 */
async function listUsers(req, res) {
  try {
    const { search } = req.query;
    
    let query = {};
    if (search) {
      query = {
        $or: [
          { fullName: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { phone: { $regex: search, $options: "i" } },
        ],
      };
    }

    const users = await User.find(query)
      .select("-password")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch users",
    });
  }
}

/**
 * Update user status (Active/Blocked)
 */
async function updateUserStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Active", "Blocked"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value. Must be Active or Blocked.",
      });
    }

    // Protect self-blocking
    if (req.user.id === id) {
      return res.status(400).json({
        success: false,
        message: "You cannot block yourself.",
      });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: `User status updated to ${status} successfully`,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update user status",
    });
  }
}

module.exports = {
  listUsers,
  updateUserStatus,
};
