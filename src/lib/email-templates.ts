const BRAND = {
  ink: "#0f0e0c",
  ivory: "#faf6ee",
  gold: "#c9a84c",
  blue: "#1d3a8a",
  red: "#8e1d2c",
  green: "#1f6f4a",
  stone: "#7c7060",
};

function layout(content: string) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:${BRAND.ivory};font-family:'Helvetica Neue',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.ivory};padding:40px 20px;">
<tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 16px rgba(15,14,12,0.08);">
<!-- Header -->
<tr><td style="background:${BRAND.ink};padding:28px 32px;text-align:center;">
  <div style="display:inline-block;">
    <span style="display:inline-block;width:24px;height:4px;background:${BRAND.blue};"></span>
    <span style="display:inline-block;width:24px;height:4px;background:${BRAND.red};"></span>
    <span style="display:inline-block;width:24px;height:4px;background:${BRAND.green};"></span>
  </div>
  <h1 style="margin:12px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:400;color:${BRAND.ivory};letter-spacing:0.08em;">CASA DEL REY MORO</h1>
  <p style="margin:4px 0 0;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:${BRAND.gold};">Ronda, Andalusia</p>
</td></tr>
<!-- Body -->
<tr><td style="padding:32px;">
${content}
</td></tr>
<!-- Footer -->
<tr><td style="padding:20px 32px;border-top:1px solid #e2d5c0;text-align:center;">
  <p style="margin:0;font-size:11px;color:${BRAND.stone};">Calle Cuesta de Santo Domingo, 9 · 29400 Ronda, Málaga</p>
  <p style="margin:4px 0 0;font-size:11px;color:${BRAND.stone};">info@casadelreymoro.com · +34 952 187 200</p>
  <p style="margin:8px 0 0;font-size:10px;color:#b8ad9c;">© ${new Date().getFullYear()} Casa del Rey Moro · Bien de Interés Cultural</p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

function codeBlock(code: string) {
  return `
<div style="margin:24px 0;text-align:center;">
  <div style="display:inline-block;padding:16px 40px;background:${BRAND.ink};border-radius:8px;border:1px solid ${BRAND.gold}40;">
    <span style="font-family:'Courier New',monospace;font-size:32px;font-weight:700;letter-spacing:0.3em;color:${BRAND.gold};">${code}</span>
  </div>
</div>`;
}

export function verifyEmailTemplate(name: string, code: string) {
  return {
    subject: "Verify Your Email — Casa del Rey Moro",
    html: layout(`
      <h2 style="margin:0 0 8px;font-family:Georgia,serif;font-size:20px;font-weight:400;color:${BRAND.ink};">Welcome, ${name}</h2>
      <p style="margin:0;font-size:14px;line-height:1.7;color:${BRAND.stone};">
        Thank you for creating an account with Casa del Rey Moro. Please use the verification code below to activate your account:
      </p>
      ${codeBlock(code)}
      <p style="margin:0;font-size:13px;color:${BRAND.stone};">
        This code expires in 30 minutes. If you didn't create an account, you can safely ignore this email.
      </p>
    `),
  };
}

export function passwordResetTemplate(name: string, code: string) {
  return {
    subject: "Password Reset — Casa del Rey Moro",
    html: layout(`
      <h2 style="margin:0 0 8px;font-family:Georgia,serif;font-size:20px;font-weight:400;color:${BRAND.ink};">Password Reset</h2>
      <p style="margin:0;font-size:14px;line-height:1.7;color:${BRAND.stone};">
        Hello ${name}, we received a request to reset your password. Use the code below:
      </p>
      ${codeBlock(code)}
      <p style="margin:0;font-size:13px;color:${BRAND.stone};">
        This code expires in 30 minutes. If you didn't request a password reset, please ignore this email and your password will remain unchanged.
      </p>
    `),
  };
}

export function passwordChangedTemplate(name: string) {
  return {
    subject: "Password Changed — Casa del Rey Moro",
    html: layout(`
      <h2 style="margin:0 0 8px;font-family:Georgia,serif;font-size:20px;font-weight:400;color:${BRAND.ink};">Password Updated</h2>
      <p style="margin:0;font-size:14px;line-height:1.7;color:${BRAND.stone};">
        Hello ${name}, your password has been successfully changed.
      </p>
      <p style="margin:16px 0 0;font-size:13px;color:${BRAND.stone};">
        If you did not make this change, please contact us immediately at info@casadelreymoro.com or call +34 952 187 200.
      </p>
    `),
  };
}

export function bookingConfirmationTemplate(data: {
  name: string;
  code: string;
  date: string;
  time: string;
  lines: { type: string; qty: number }[];
  total: number;
}) {
  const PRICES: Record<string, number> = { standard: 10, child: 3, family: 22, guided: 18 };
  const LABELS: Record<string, string> = { standard: "General Admission", child: "Child (4–12)", family: "Family Pack", guided: "Guided Tour" };

  const lineRows = data.lines
    .map(
      (l) => `
    <tr>
      <td style="padding:8px 0;font-size:13px;color:${BRAND.ink};border-bottom:1px solid #f4ede0;">${LABELS[l.type] || l.type}</td>
      <td style="padding:8px 0;font-size:13px;color:${BRAND.stone};text-align:center;border-bottom:1px solid #f4ede0;">×${l.qty}</td>
      <td style="padding:8px 0;font-size:13px;color:${BRAND.ink};text-align:right;border-bottom:1px solid #f4ede0;">€${((PRICES[l.type] || 0) * l.qty).toFixed(2)}</td>
    </tr>`
    )
    .join("");

  return {
    subject: `Booking Confirmed ${data.code} — Casa del Rey Moro`,
    html: layout(`
      <h2 style="margin:0 0 8px;font-family:Georgia,serif;font-size:20px;font-weight:400;color:${BRAND.ink};">Booking Confirmed</h2>
      <p style="margin:0;font-size:14px;line-height:1.7;color:${BRAND.stone};">
        Thank you, ${data.name}. Your visit to Casa del Rey Moro has been confirmed.
      </p>

      <div style="margin:24px 0;padding:20px;background:${BRAND.ivory};border-radius:8px;border:1px solid #e2d5c0;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="font-size:10px;text-transform:uppercase;letter-spacing:0.2em;color:${BRAND.gold};font-weight:600;">Booking Code</td>
            <td style="text-align:right;font-family:'Courier New',monospace;font-size:18px;font-weight:700;letter-spacing:0.15em;color:${BRAND.ink};">${data.code}</td>
          </tr>
        </table>
      </div>

      <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 16px;">
        <tr>
          <td style="padding:8px 0;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:${BRAND.gold};font-weight:600;">Date</td>
          <td style="padding:8px 0;font-size:14px;color:${BRAND.ink};text-align:right;">${data.date}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:${BRAND.gold};font-weight:600;">Time</td>
          <td style="padding:8px 0;font-size:14px;color:${BRAND.ink};text-align:right;">${data.time}</td>
        </tr>
      </table>

      <table width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 16px;">
        <tr style="border-bottom:2px solid #e2d5c0;">
          <td style="padding:8px 0;font-size:10px;text-transform:uppercase;letter-spacing:0.15em;color:${BRAND.gold};font-weight:600;">Ticket</td>
          <td style="padding:8px 0;font-size:10px;text-transform:uppercase;letter-spacing:0.15em;color:${BRAND.gold};font-weight:600;text-align:center;">Qty</td>
          <td style="padding:8px 0;font-size:10px;text-transform:uppercase;letter-spacing:0.15em;color:${BRAND.gold};font-weight:600;text-align:right;">Subtotal</td>
        </tr>
        ${lineRows}
        <tr>
          <td colspan="2" style="padding:12px 0 0;font-size:14px;font-weight:600;color:${BRAND.ink};">Total</td>
          <td style="padding:12px 0 0;font-size:18px;font-weight:700;color:${BRAND.ink};text-align:right;">€${data.total.toFixed(2)}</td>
        </tr>
      </table>

      <p style="margin:16px 0 0;font-size:13px;color:${BRAND.stone};">
        Please present this confirmation email or your booking code at the entrance. Opening hours: Daily 10:00 – 19:00 (last entry 18:00).
      </p>
    `),
  };
}

export function activationTemplate(name: string, code: string) {
  return {
    subject: "Account Activation — Casa del Rey Moro",
    html: layout(`
      <h2 style="margin:0 0 8px;font-family:Georgia,serif;font-size:20px;font-weight:400;color:${BRAND.ink};">Activate Your Account</h2>
      <p style="margin:0;font-size:14px;line-height:1.7;color:${BRAND.stone};">
        Hello ${name}, please use the code below to activate your Casa del Rey Moro account:
      </p>
      ${codeBlock(code)}
      <p style="margin:0;font-size:13px;color:${BRAND.stone};">
        This code expires in 30 minutes.
      </p>
    `),
  };
}
