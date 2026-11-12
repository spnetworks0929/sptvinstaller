import { PrismaClient } from '@prisma/client';
const db=new PrismaClient();
async function main(){for(const [name,country,city] of [['Alex - Toronto','CA','Toronto'],['Taylor - Houston','US','Houston']]){const existing=await db.technician.findFirst({where:{name}});const tech=existing||await db.technician.create({data:{name,country,city}});for(let d=1;d<=21;d++){for(const hour of [9,12,15]){const day=new Date();day.setUTCDate(day.getUTCDate()+d);day.setUTCHours(hour,0,0,0);if(day.getUTCDay()===0)continue;await db.slot.upsert({where:{technicianId_startAt:{technicianId:tech.id,startAt:day}},update:{},create:{technicianId:tech.id,startAt:day,endAt:new Date(day.getTime()+2*3600000)}})}}} }
main().finally(()=>db.$disconnect());
