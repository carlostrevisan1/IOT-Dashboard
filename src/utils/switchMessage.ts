export default function switchMessage(value:string, state:boolean){
    const messageIndex = Number(!state);
    const msgs = value.split("Ḝ");
    return msgs[messageIndex];
}