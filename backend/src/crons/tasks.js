const cron = require("node-cron");
const { findExpiredUsers } = require("../controllers/users/findExpiredUsers");
const {
  createExpirationEmail,
} = require("../../email-templates/createExpirationEmail");
const { sendEmail } = require("../utils/utils");
const { usersBulkUpdate } = require("../controllers/users/usersBulkUpdate");

module.exports.Crons = () => {
  cron.schedule("0 0 * * *", async () => {
    let users = await findExpiredUsers();
    if (users.length > 0) {
      const subject = "Your WheevoDrive Subscription is Expiring Today";
      await usersBulkUpdate(users);
      for (const user of users) {
        const htmlContent = createExpirationEmail(user.username);
        const from = user.email;
        await sendEmail(
          from,
          subject,
          "Your subscription plan is expiring today. Please visit https://WheevoDrive.com/premium-plans to renew.",
          htmlContent,
          user.email
        );
      }
    }
  });
};
