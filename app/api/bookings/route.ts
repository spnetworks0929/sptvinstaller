import {NextRequest,NextResponse} from 'next/server';
import {db} from '@/lib/db';
import {quote,services,sizes} from '@/lib/pricing';
import {sendConfirmation} from '@/lib/email';
import {z} from 'zod';
import {randomBytes} from 'crypto';

const schema=z.object({customerName:z.string().trim().min(2).max(100),email:z.string().email(),phone:z.string().min(7).max(30),address:z.string().min(5).max(200),postal:z.string().min(3).max(20),notes:z.string().max(1000).optional(),country:z.enum(['CA','US']),city:z.string(),service:z.string(),size:z.string(),wall:z.string(),slotId:z.string()});

export async function POST(req:NextRequest){
  let input:z.infer<typeof schema>;
  try{input=schema.parse(await req.json())}catch{return NextResponse.json({error:'Please check the booking details'},{status:400})}
  if(!services.some(x=>x.id===input.service)||!sizes.some(x=>x.id===input.size))return NextResponse.json({error:'Invalid service or size'},{status:400});
  const slot=await db.slot.findUnique({where:{id:input.slotId},include:{technician:true,booking:true}});
  if(!slot||slot.booking||slot.isBlocked||slot.startAt<=new Date()||!slot.technician.active||slot.technician.country!==input.country||slot.technician.city!==input.city)return NextResponse.json({error:'This appointment is no longer available. Please choose another.'},{status:409});
  const {total}=quote(input.service,input.size);
  let booking;
  try{
    booking=await db.booking.create({data:{customerName:input.customerName,email:input.email,phone:input.phone,address:input.address,postal:input.postal,notes:input.notes,country:input.country,city:input.city,tvSize:input.size,mountType:input.service,wallType:input.wall,slotId:slot.id,technicianId:slot.technicianId,priceCents:total,depositCents:0,currency:input.country==='CA'?'cad':'usd',status:'CONFIRMED',accessToken:randomBytes(24).toString('hex')}});
  }catch{return NextResponse.json({error:'This slot was just reserved. Please choose another.'},{status:409})}
  try{
    const full=await db.booking.findUnique({where:{id:booking.id},include:{slot:true,technician:true}});
    if(full)await sendConfirmation(full);
  }catch(error){console.error('Booking confirmed but confirmation email failed',error)}
  return NextResponse.json({bookingUrl:`/booking/${booking.accessToken}`},{status:201});
}
