export default function sliderMessage(value:string, number:number){
    const info = value.split("Ḝ");
    const msg = info[2] + String(number) + info[3];
    return msg;
}