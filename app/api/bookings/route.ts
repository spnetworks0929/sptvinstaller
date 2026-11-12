import {NextRequest,NextResponse} from 'next/server';
import {db} from '@/lib/db';
import {quote,services,sizes} from '@/lib/pricing';
import {sendBookingRequest} from '@/lib/email';
import {z} from 'zod';
import {randomBytes} from 'crypto';
const schema=z.object({customerName:z.string().trim().min(2).max(100),email:z.string().email(),phone:z.string().min(7).max(30),address:z.string().min(5).max(200),postal:z.string().min(3).max(20),notes:z.string().max(1000).optional(),country:z.enum(['CA','US']),city:z.string().min(2).max(100),service:z.string(),size:z.string(),wall:z.string(),preferredDate:z.string().regex(/^\d{4}-\d{2}-\d{2}$/),preferredTime:z.string().min(2),needsMount:z.boolean().default(false)});
export async function POST(req:NextRequest){
 let input:z.infer<typeof schema>;
 try{input=schema.parse(await req.json())}catch{return NextResponse.json({error:'Please check the booking details'},{status:400})}
 if(!services.some(s=>s.id===input.service)||!sizes.some(s=>s.id===input.size))return NextResponse.json({error:'Invalid installation selection'},{status:400});
 if(input.preferredDate<new Date().toISOString().slice(0,10))return NextResponse.json({error:'Please select a future date'},{status:400});
 const {total}=quote(input.service,input.size);
 try{
  const booking=await db.booking.create({data:{customerName:input.customerName,email:input.email,phone:input.phone,address:input.address,postal:input.postal,notes:input.notes,country:input.country,city:input.city,tvSize:input.size,mountType:input.service,wallType:input.wall,preferredDate:input.preferredDate,preferredTime:input.preferredTime,needsMount:input.needsMount,priceCents:total,depositCents:0,currency:input.country==='CA'?'cad':'usd',status:'PENDING_CONFIRMATION',accessToken:randomBytes(24).toString('hex')}});
  try{await sendBookingRequest(booking)}catch(e){console.error('Booking stored but notification failed',e)}
  return NextResponse.json({bookingUrl:`/booking/${booking.accessToken}`},{status:201});
 }catch(e){console.error('Unable to save booking',e);return NextResponse.json({error:'Booking system is not yet configured. Please call (226) 336-7339 or email info@sptvinstaller.com.'},{status:503})}
}
