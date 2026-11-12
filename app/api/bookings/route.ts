import {NextRequest,NextResponse} from 'next/server';
import {Resend} from 'resend';
import {z} from 'zod';
import {services,sizes} from '@/lib/pricing';

export const runtime='nodejs';
const schema=z.object({customerName:z.string().trim().min(2).max(100),email:z.string().trim().email().max(254),phone:z.string().trim().min(7).max(30),address:z.string().trim().min(5).max(200),postal:z.string().trim().min(3).max(20),notes:z.string().max(1000).optional(),country:z.enum(['CA','US']),city:z.string().trim().min(2).max(100),service:z.string(),size:z.string(),wall:z.string().max(100),preferredDate:z.string().regex(/^\d{4}-\d{2}-\d{2}$/),preferredTime:z.string().min(2).max(100),needsMount:z.boolean().default(false),website:z.string().max(200).optional()});
const escapeHtml=(v:string)=>v.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot',"'":'&#39;'}[c]||c));
export async function POST(req:NextRequest){
 if(Number(req.headers.get('content-length')||0)>12000)return NextResponse.json({error:'Request is too large'},{status:413});
 let input:z.infer<typeof schema>;
 try{input=schema.parse(await req.json())}catch{return NextResponse.json({error:'Please check your booking details.'},{status:400})}
 if(input.website)return NextResponse.json({success:true},{status:200});
 if(!services.some(s=>s.id===input.service)||!sizes.some(s=>s.id===input.size))return NextResponse.json({error:'Invalid installation selection.'},{status:400});
 if(input.preferredDate<new Date().toISOString().slice(0,10))return NextResponse.json({error:'Please select a future date.'},{status:400});
 const key=process.env.RESEND_API_KEY,from=process.env.EMAIL_FROM,to=process.env.BOOKING_NOTIFICATION_EMAIL||'info@sptvinstaller.com';
 if(!key||!from)return NextResponse.json({error:'Booking email is not configured yet. Please call (226) 336-7339.'},{status:503});
 const reference=crypto.randomUUID().slice(0,8).toUpperCase();
 const rows:[string,string][]=[['Reference',reference],['Name',input.customerName],['Phone',input.phone],['Email',input.email],['Address',input.address],['City',input.city],['Postal / ZIP',input.postal],['Country',input.country],['Installation type',services.find(s=>s.id===input.service)?.label||input.service],['TV size',sizes.find(s=>s.id===input.size)?.label||input.size],['Wall type',input.wall],['Supply TV mount',input.needsMount?'Yes (quote separately)':'No'],['Preferred date',input.preferredDate],['Preferred time',input.preferredTime],['Notes',input.notes||'None']];
 const html='<div style="font-family:Arial,sans-serif"><h2>New TV installation request — pending confirmation</h2><table>'+rows.map(([k,v])=>`<tr><th style="text-align:left;padding:6px;vertical-align:top">${escapeHtml(k)}</th><td style="padding:6px">${escapeHtml(v)}</td></tr>`).join('')+'</table><p>No deposit requested. Contact the customer to confirm the appointment.</p></div>';
 try{
  const resend=new Resend(key);
  const sent=await resend.emails.send({from,to,replyTo:input.email,subject:`New TV installation request — ${input.city} — ${reference}`,html});
  if(sent.error){console.error('Resend booking delivery failed',sent.error);return NextResponse.json({error:'We could not send your request. Please call (226) 336-7339.'},{status:502})}
  // Staff notification is the required delivery. Customer receipt is best-effort.
  try{const receipt=await resend.emails.send({from,to:input.email,subject:`SP TV Installer — request received (${reference})`,html:`<div style="font-family:Arial,sans-serif"><h2>Thank you for contacting SP TV Installer!</h2><p>We received your installation request (${reference}). Our team will contact you to confirm availability and final pricing.</p><p>Your preferred appointment is <b>not yet confirmed</b>. No deposit or online payment is required.</p><p>Questions? Call (226) 336-7339.</p></div>`});if(receipt.error)console.error('Customer receipt failed',receipt.error)}catch(e){console.error('Customer receipt failed',e)}
  return NextResponse.json({success:true,reference},{status:200});
 }catch(e){console.error('Booking email service unavailable',e);return NextResponse.json({error:'We could not send your request. Please call (226) 336-7339.'},{status:502})}
}
