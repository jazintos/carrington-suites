import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendBookingConfirmationEmail(booking: any) {
  try {
    await resend.emails.send({
      from: "Carrington Suites <no-reply@yourdomain.com>",
      to: booking.email,
      subject: "Booking Confirmation - Carrington Suites",
      html: `
      <div style="font-family:Arial;padding:20px;">
      <h2 style="color:#0B2C5F;">Carrington Suites</h2>
      <hr/>
      
      <h3>Booking Confirmed</h3>
  
      <p>Dear ${booking.name},</p>
  
      <p>Your stay has been successfully reserved.</p>
  
      <div style="background:#f5f5f5;padding:15px;border-radius:8px;">
        <p><strong>Reference:</strong> ${booking.reference}</p>
        <p><strong>Apartment:</strong> ${booking.unit.apartmentType.name}</p>
        <p><strong>Unit:</strong> ${booking.unit.name}</p>
        <p><strong>Total Paid:</strong> ₦${booking.totalPrice.toLocaleString()}</p>
      </div>
  
      <p style="margin-top:20px;">
        <a href="https://yourdomain.com/booking/check?ref=${booking.reference}"
           style="background:#3F6A64;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;">
          View Booking
        </a>
      </p>
  
      <p>We look forward to hosting you.</p>
    </div>

        <p><strong>Carrington Suites</strong></p>
      `,
    });
  } catch (error) {
    console.error("EMAIL ERROR:", error);
  }
}