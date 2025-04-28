import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendMail({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}) {
  await resend.emails.send({
    from: "Scyra <onboarding@resend.dev>",
    to,
    subject,
    text,
    html,
    react: undefined,
  });
}
