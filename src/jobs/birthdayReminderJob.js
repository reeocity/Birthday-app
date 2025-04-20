const cron = require("node-cron");
const User = require("../models/User");
const transporter = require("../config/mailer");

const sendBirthdayEmails = async () => {
  const today = new Date();
  const users = await User.find();

  for (const user of users) {
    const dob = new Date(user.dob);
    if (
      dob.getDate() === today.getDate() &&
      dob.getMonth() === today.getMonth()
    ) {
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: user.email,
          subject: "🎉 Happy Birthday!",
          html: `<h2>Hey ${user.fullname}!</h2>
                 <p>🎈 We at Birthday Reminder wish you a very Happy Birthday! 🥳</p>
                 <img src="https://media.giphy.com/media/3ohs7KViFvZCk4FfYY/giphy.gif" style="width:300px;border-radius:10px"/>
                 <p>Have a blast! 💖</p>`
        });
        console.log(`✅ Email sent to ${user.email}`);
      } catch (err) {
        console.error(`❌ Failed for ${user.email}:`, err.message);
      }
    }
  }
};

// ⏰ Schedule at 7:00 AM daily
cron.schedule("0 7 * * *", sendBirthdayEmails);
