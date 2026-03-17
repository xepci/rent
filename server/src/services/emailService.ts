import nodemailer from "nodemailer";
import { env } from "../config/env.js";

const transporter = nodemailer.createTransport({
  host: env.EMAIL_HOST,
  port: env.EMAIL_PORT,
  secure: false,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

function brandedTemplate(content: string) {
  const year = new Date().getFullYear();

  return `
  <html>
  <body style="margin:0;background:#f0f2f5;font-family:Arial,sans-serif;">
    <table width="100%" style="padding:30px 0;">
      <tr>
        <td align="center">
          <table width="600" style="background:#fff;border-radius:8px;overflow:hidden">
            <tr>
              <td style="background:#1e3a5f;padding:25px;text-align:center">
                <img src="https://i.imgur.com/q5PdfBw.png" width="200" alt="Sahitaj Rent" />
              </td>
            </tr>

            <tr>
              <td style="padding:35px;font-size:15px;line-height:1.7;color:#1a1a2e">
                ${content}
              </td>
            </tr>

            <tr>
              <td style="background:#1e3a5f;color:#fff;padding:18px;font-size:13px">
                Email: sahitajrent@gmail.com<br/>
                Phone: +383 44 313 947<br/>
                Location: Istog, Kosovo
              </td>
            </tr>
          </table>

          <p style="font-size:11px;color:#7a8aa0">© ${year} Sahitaj Rent</p>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}

function infoTable(rows: [string, string][]) {
  const cells = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:9px 14px;font-weight:600;color:#1e3a5f;white-space:nowrap;width:40%;border-bottom:1px solid #eef0f4;background:#f7f9fc">${label}</td>
          <td style="padding:9px 14px;color:#1a1a2e;border-bottom:1px solid #eef0f4">${value}</td>
        </tr>`
    )
    .join("");

  return `
    <table width="100%" style="border-collapse:collapse;border-radius:6px;overflow:hidden;border:1px solid #dde2ea;margin:18px 0;font-size:14px">
      ${cells}
    </table>
  `;
}

export async function sendEmail(options: {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}) {
  await transporter.sendMail({
    from: env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
    replyTo: options.replyTo,
  });
}

export async function sendBookingNotificationEmail(data: {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  carName: string;
  pickupDate: string;
  pickupTime: string;
  dropoffDate: string;
  dropoffTime: string;
  pickupLocation: string;
  dropoffLocation: string;
  totalPrice: number;
  notes?: string | null;
}) {
  const content = `
    <p>Përshëndetje,</p>
    <p>Është dërguar një kërkesë e re për rezervim.</p>

    <p style="font-weight:600;color:#1e3a5f;margin-bottom:4px">👤 Informacionet e klientit</p>
    ${infoTable([
      ["Klienti", data.customerName],
      ["Email", data.customerEmail],
      ["Telefoni", data.customerPhone],
    ])}

    <p style="font-weight:600;color:#1e3a5f;margin-bottom:4px">🚗 Detajet e rezervimit</p>
    ${infoTable([
      ["Makina", data.carName],
      ["Marrja", `${data.pickupDate} ${data.pickupTime}`],
      ["Kthimi", `${data.dropoffDate} ${data.dropoffTime}`],
      ["Vendmarrja", data.pickupLocation],
      ["Vendkthimi", data.dropoffLocation],
      ["Totali", `€${data.totalPrice}`],
      ["Shënime", data.notes || "—"],
    ])}

    <p>Gjitha të mirat,<br/><strong>Sahitaj Rent</strong></p>
  `;

  await sendEmail({
    to: env.ADMIN_NOTIFICATION_EMAIL,
    subject: `Kërkesë e re për rezervim – ${data.carName}`,
    html: brandedTemplate(content),
    replyTo: data.customerEmail,
  });
}

export async function sendBookingCustomerConfirmationEmail(data: {
  customerEmail: string;
  customerName: string;
  carName: string;
  pickupDate: string;
  pickupTime: string;
  dropoffDate: string;
  dropoffTime: string;
}) {
  const content = `
    <p>Përshëndetje <strong>${data.customerName}</strong>,</p>
    <p>Rezervimi juaj për <strong>${data.carName}</strong> është konfirmuar.</p>

    ${infoTable([
      ["Makina", data.carName],
      ["Marrja", `${data.pickupDate} ${data.pickupTime}`],
      ["Kthimi", `${data.dropoffDate} ${data.dropoffTime}`],
    ])}

    <p>Ju faleminderit që zgjodhët Sahitaj Rent.</p>
    <p>Gjitha të mirat,<br/><strong>Sahitaj Rent</strong></p>
  `;

  await sendEmail({
    to: data.customerEmail,
    subject: `Rezervimi juaj është konfirmuar – ${data.carName}`,
    html: brandedTemplate(content),
  });
}

export async function sendBookingCancellationEmail(data: {
  customerEmail: string;
  customerName: string;
  carName: string;
}) {
  const content = `
    <p>Përshëndetje <strong>${data.customerName}</strong>,</p>

    <p>
      Na vjen keq t'ju informojmë se rezervimi juaj për
      <strong>${data.carName}</strong> është anuluar.
    </p>

    <p>Nëse keni pyetje ose dëshironi të bëni një rezervim tjetër, na kontaktoni.</p>

    <p>Gjitha të mirat,<br/><strong>Sahitaj Rent</strong></p>
  `;

  await sendEmail({
    to: data.customerEmail,
    subject: `Rezervimi juaj është anuluar – ${data.carName}`,
    html: brandedTemplate(content),
  });
}

export async function sendContactNotificationEmail(data: {
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
}) {
  const content = `
    <p>Përshëndetje,</p>
    <p>Është dërguar një mesazh i ri nga formulari i kontaktit.</p>

    ${infoTable([
      ["Emri", data.name],
      ["Email", data.email],
      ["Telefoni", data.phone || "—"],
      ["Subjekti", data.subject || "—"],
    ])}

    <p style="font-weight:600;color:#1e3a5f;margin-bottom:4px">Mesazhi:</p>
    <div style="white-space:pre-wrap;background:#f7f9fc;border:1px solid #dde2ea;border-radius:6px;padding:14px 16px;font-size:14px;line-height:1.7">${data.message}</div>

    <p style="margin-top:24px">Gjitha të mirat,<br/><strong>Sahitaj Rent</strong></p>
  `;

  await sendEmail({
    to: env.ADMIN_NOTIFICATION_EMAIL,
    subject: `Mesazh i ri kontakti${data.subject ? ` – ${data.subject}` : ""}`,
    html: brandedTemplate(content),
    replyTo: data.email,
  });
}

export async function sendAdminReplyEmail(data: {
  to: string;
  customerName?: string | null;
  subject: string;
  message: string;
}) {
  const content = `
    <p>Përshëndetje${data.customerName ? ` <strong>${data.customerName}</strong>` : ""},</p>

    <div style="white-space:pre-wrap;margin-bottom:24px;line-height:1.7;">
      ${data.message.trim()}
    </div>

    <p>Gjitha të mirat,<br/><strong>Sahitaj Rent</strong></p>
  `;

  await sendEmail({
    to: data.to,
    subject: data.subject,
    html: brandedTemplate(content),
    text: `Përshëndetje${data.customerName ? ` ${data.customerName}` : ""},

${data.message.trim()}

Gjitha të mirat,
Sahitaj Rent

Email: sahitajrent@gmail.com
Phone: +383 44 313 947
Location: Istog, Kosovo`,
  });
}