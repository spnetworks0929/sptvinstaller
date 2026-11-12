import {cookies} from 'next/headers';import {createHmac,timingSafeEqual} from 'crypto';
function signature(){return createHmac('sha256',process.env.ADMIN_SESSION_SECRET||'unset').update('admin-session-v1').digest('hex')}
export function validPassword(value:string){const expected=process.env.ADMIN_PASSWORD||'';return expected.length>=16&&value.length===expected.length&&timingSafeEqual(Buffer.from(value),Buffer.from(expected))}
export async function isAdmin(){const c=await cookies();const v=c.get('sptv_admin')?.value||'';const s=signature();return v.length===s.length&&timingSafeEqual(Buffer.from(v),Buffer.from(s))}
export function sessionValue(){return signature()}
