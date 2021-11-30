export default function hexToRgb(hex:string){
    var c:string|string[];
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return [(Number(c)>>16)&255, (Number(c)>>8)&255, Number(c)&255];
    }
    throw new Error('Bad Hex');
  }