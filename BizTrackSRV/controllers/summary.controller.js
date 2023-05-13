const mailSender = require("../services/mailsender");

exports.save = async (req, res) => {
    const details = req.body
    try {
        mailSender.sendMail(details)
        res.send({done:true})
    } catch (error) {
        res.send({error:true})
    }
};