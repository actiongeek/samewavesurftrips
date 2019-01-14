import config from '../config';

const api_key = config.mailgun.key,
	  domain = config.mailgun.domain,
      mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
        
export function notify_newUser(email, res){
 
    res.render('email/newuser-confirm', { layout:'notification', email }, function(err, html){

		var data = { 
            html: html,
            from: config.mailgun.from,
            to: email,
            subject: 'Please confirm your email account'
        };

        mailgun.messages().send(data, function (error, body) {
            console.log('MailSent : newuser-confirm');
        });

    });
    
} 