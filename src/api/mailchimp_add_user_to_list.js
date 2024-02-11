const client = require("@mailchimp/mailchimp_marketing");
const md5 = require("md5");

client.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_PREFIX,
});

// https://mailchimp.com/developer/marketing/api/list-members/add-or-update-list-member/

export default async function setNewUserToMailchimpList(req, res) {
  console.log("here is req.body in setNewUserToMailchimpList", req.body);
  try {
    const response = await client.lists.setListMember(
      process.env.MAILCHIMP_AUDIENCE_ID,
      md5(req.body.email.toLowerCase()),
      {
        email_address: req.body.email.toLowerCase(),
        status_if_new: "subscribed",
        merge_fields: {
          FNAME: req.body.name.first,
          LNAME: req.body.name.last,
        },
      }
    );
    console.log(
      "here is the response in setNewUserToMailchimpList: ",
      response
    );
    res.status(200).json({ response });
  } catch (error) {
    console.log("here is the error in setNewUserToMailchimpList: ", error);
    res.status(200).send({ error });
  }
}
