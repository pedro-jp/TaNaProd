import sgMail from '@sendgrid/mail';

interface MailRequest {
  to: string;
  subject: string;
  text: string;
}

export const sendEmail = async ({ to, subject, text }: MailRequest) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
  const msg = {
    to,
    from: 'contato@intg.com.brb',
    subject,
    text
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent successfully');
  } catch (error) {
    console.error(error);
  }
};
