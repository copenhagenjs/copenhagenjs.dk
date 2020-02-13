import MailService from "@sendgrid/mail/src/mail";

MailService.setApiKey(process.env.SENDGRID || "");

type Mail = {
  to: string,
  content: string,
  subject: string
};

export function sendMail(mail: Mail) {
  const msg = {
    to: mail.to,
    from: "info@copenhagenjs.dk",
    subject: mail.subject,
    html: mail.content
  };
  return MailService.send(msg);
}

if(require.main === module ) {
  console.log('sending test mail')
  sendMail({
    to: "kevin.simper@gmail.com",
    subject: 'first mail',
    content: 'test content'
  })
}
