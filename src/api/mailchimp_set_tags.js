const client = require("@mailchimp/mailchimp_marketing");
const md5 = require("md5");

client.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_PREFIX,
});

export default async function setTags(req, res) {
  console.log("here is the req.body setTags: ", req.body);
  try {
    const response = await client.lists.updateListMemberTags(
      process.env.MAILCHIMP_AUDIENCE_ID,
      md5(req.body.email.toLowerCase()),
      {
        tags: [
          { name: req.body.serviceTitle, status: "active" },
          { name: "Main Site", status: "active" },
        ],
      }
    );
    console.log("here is setTags response ", response);
    res.status(200).json({
      response,
    });
  } catch (error) {
    console.log("here is the setTags Error: ", error);
    res.status(200).send({ error });
  }
}
