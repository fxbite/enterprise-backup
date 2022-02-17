const nodemailer = require('nodemailer')
const {google} = require('googleapis')
const {CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN} = require('../config/variables')

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );        

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN})  


async function notificationMail(fullname, email, option) {

    try {
        const accessToken = await oauth2Client.getAccessToken()
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'thinhltgcs190714@fpt.edu.vn',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })

        const mailIdea = {
            from: 'CMS ENTERPRISE 🚀 <thinhltgcs190714@fpt.edu.vn>',
            to: email,
            subject: 'Someone has commented in your Idea - Check it now',
            html: `<h3>Hi ${fullname}, we notice that you have a comment in your idea.</h3>`
          }
      
        const mailReply = {
            from: 'CMS ENTERPRISE 🚀 <thinhltgcs190714@fpt.edu.vn>',
            to: email,
            subject: 'Someone has replied in your Comment - Check it now',
            html: `<h3>Hi ${fullname}, we notice that you have a reply in your comment.</h3>`
        }

        
        if(option === 'idea'){
            const resultIdea = await transport.sendMail(mailIdea)
            return resultIdea
        } else {
            const resultReply = await transport.sendMail(mailReply)
            return resultReply
        }

    } catch (error) {
        return error
    }
        
}


module.exports = notificationMail