import sgMail from '@sendgrid/mail';

interface MailRequest {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export const sendEmail = async ({ to, subject, text, html }: MailRequest) => {
  if (!process.env.SENDGRID_API_KEY)
    return console.error('Missing Sendgrid API key');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to,
    from: 'contato@intg.com.br',
    subject,
    text,
    html
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);
  }
};
