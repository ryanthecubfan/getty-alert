var nodeMailer = require('nodemailer'),
    log        = require('./log.js');

var component = "MAILER";

exports.sendMail = function(subject, body, recipients) {
    // Use Smtp Protocol to send Email
    var smtpTransport = nodeMailer.createTransport({
        service: "gmail",
        auth: {
            user: this.account,
            pass: this.password
        }
    });

    var mail = {
        from: this.fromName + " <" + this.account + ">",
        to: recipients,
        subject: subject,
        text: body
    }

    smtpTransport.sendMail(mail, function(error, response){
        if(error) {
            log.write(component, error, "ERROR");
        } else {
            log.write(component, "Message sent: " + response.messageId);
        }

        smtpTransport.close();
    });
}

exports.init = function(config) {
    this.account  = config.account  || "gettyembed@gmail.com";
    this.password = config.password || "Ph0t0graph";
    this.fromName = config.name     || "Getty Embed Alert";
}