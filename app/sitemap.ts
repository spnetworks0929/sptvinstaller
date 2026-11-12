import type {MetadataRoute} from 'next';
export default function sitemap():MetadataRoute.Sitemap{const base=process.env.NEXT_PUBLIC_BASE_URL||'https://sptvinstaller.vercel.app';return ['','/book','/locations/toronto','/locations/houston'].map(path=>({url:base+path,lastModified:new Date(),changeFrequency:'monthly',priority:path===''?1:.8}))}
