import {Resend} from 'resend';
import type {Booking} from '@prisma/client';
const escapeHtml=(v:string)=>v.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]||c));
export async function sendBookingRequest(b:Booking){
 if(!process.env.RESEND_API_KEY||!process.env.EMAIL_FROM){console.warn('Booking email not configured',b.id);return}
 const resend=new Resend(process.env.RESEND_API_KEY);
 const details=`<p><b>Name:</b> ${escapeHtml(b.customerName)}<br/><b>Phone:</b> ${escapeHtml(b.phone)}<br/><b>Email:</b> ${escapeHtml(b.email)}<br/><b>Address:</b> ${escapeHtml(b.address)}, ${escapeHtml(b.city)}, ${escapeHtml(b.postal)}<br/><b>Country:</b> ${escapeHtml(b.country)}<br/><b>TV size:</b> ${escapeHtml(b.tvSize)}<br/><b>Mounting:</b> ${escapeHtml(b.mountType)}<br/><b>Wall:</b> ${escapeHtml(b.wallType)}<br/><b>Supply mount:</b> ${b.needsMount?'Yes':'No'}<br/><b>Preferred:</b> ${escapeHtml(b.preferredDate||'')} / ${escapeHtml(b.preferredTime||'')}<br/><b>Notes:</b> ${escapeHtml(b.notes||'None')}</p>`;
 const customer=await resend.emails.send({from:process.env.EMAIL_FROM,to:b.email,subject:'SP TV Installer — appointment request received',html:`<div style="font-family:Arial,sans-serif"><h1>Thank you for your request!</h1><p>Our team will contact you to confirm your installation date, time and final pricing. No upfront payment is required.</p>${details}<p>Questions? (226) 336-7339 · info@sptvinstaller.com</p></div>`});
 if(customer.error)console.error('Customer email error',customer.error);
 const staff=await resend.emails.send({from:process.env.EMAIL_FROM,to:process.env.BOOKING_NOTIFICATION_EMAIL||'info@sptvinstaller.com',replyTo:b.email,subject:'New TV installation booking request — '+b.city,html:`<div style="font-family:Arial,sans-serif"><h1>New request — pending confirmation</h1>${details}<p>Reference: ${escapeHtml(b.id)}</p></div>`});
 if(staff.error)throw new Error(staff.error.message);
}
