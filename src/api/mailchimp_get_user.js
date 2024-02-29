const client = require("@mailchimp/mailchimp_marketing");
const md5 = require("md5");

client.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_PREFIX,
});

export default async function getUser(req, res) {
  console.log("here is the req.body getUser", req.body);
  try {
    const response = await client.lists.getListMember(
      process.env.MAILCHIMP_AUDIENCE_ID,
      md5(req.body.email.toLowerCase())
    );

    res.status(200).json({
      success: "success",
      first: response.merge_fields.FNAME,
      last: response.merge_fields.LNAME,
      email: response.email_address,
    });
  } catch (error) {
    res.status(200).send({ error });
  }
}
