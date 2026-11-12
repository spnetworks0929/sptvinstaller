export const services = [
  {id:'standard',label:'Standard wall mounting',description:'Secure, level installation on a suitable wall',price:40},
  {id:'full',label:'Full-motion mounting',description:'Adjustable viewing angle and positioning',price:40},
  {id:'fireplace',label:'Above-fireplace mounting',description:'Special placement and heat-clearance assessment',price:40},
  {id:'custom',label:'Custom installation',description:'Special surfaces or complex mounting',price:40},
];
export const sizes = [
  {id:'small',label:'Up to 43 inches',min:40,max:100},
  {id:'medium',label:'44–54 inches',min:50,max:150},
  {id:'large',label:'55–65 inches',min:50,max:200},
  {id:'xl',label:'66–85 inches',min:50,max:200},
  {id:'xxl',label:'Over 85 inches',min:75,max:200},
];
export function quote(service:string,size:string){
  if(!services.some(s=>s.id===service))throw new Error('Invalid service');
  const selected=sizes.find(s=>s.id===size);
  if(!selected)throw new Error('Invalid TV size');
  return {total:selected.min*100,maxTotal:selected.max*100,deposit:0};
}
