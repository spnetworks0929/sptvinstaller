import Link from 'next/link';
export default async function Received({searchParams}:{searchParams:Promise<{reference?:string}>}){
 const {reference}=await searchParams;
 return <main className="statusPage"><div className="statusCard"><div className="eyebrow">SP TV INSTALLER</div><h1>Thank you! Your request has been sent.</h1><p>Our team will contact you to confirm the installation appointment and final pricing. Your preferred date is not yet confirmed.</p>{reference&&<p>Request reference: <b>{reference.replace(/[^A-Z0-9-]/gi,'').slice(0,16)}</b></p>}<p><b>Due today: $0.00</b> — no deposit or online payment required.</p><p>Questions? Call (226) 336-7339.</p><Link href="/" className="btn dark">Back to homepage</Link></div></main>
}
