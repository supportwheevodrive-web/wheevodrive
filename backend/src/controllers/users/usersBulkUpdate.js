const User = require("../../../models/users/userSchema");

module.exports.usersBulkUpdate = async (users) => {
  try {
    const ids = users.map((user) => user._id);
    await User.updateMany(
      { _id: { $in: ids } },
      {
        $set: {
          subscribed: false,
          subscription_plan: "Free",
          subscription_expires_at: null,
        },
      }
    );
  } catch (error) {
    return error;
  }
};
