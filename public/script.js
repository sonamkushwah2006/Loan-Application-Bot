const messages = document.getElementById("messages");
const input = document.getElementById("userInput");

let step=0, income=0, loan=0;

function add(text,who){
 messages.innerHTML+=`<div class="${who}">${text}</div>`;
 messages.scrollTop=messages.scrollHeight;
}

function bot(text){
 add("Typing...","bot");
 setTimeout(()=>{
  messages.lastChild.remove();
  add(text,"bot");
 },800);
}

function quick(type){
 if(type=="start") bot("Let's check eligibility! Enter monthly income");
 if(type=="emi") bot("Enter loan amount to calculate EMI");
 if(type=="faq") bot("FAQ:\n• Min income ₹25k\n• Age 21‑60\n• Instant approval demo");
 step=1;
}

function emiCalc(P){
 let r=0.1/12;
 let n=12;
 return Math.round(P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1));
}

function sendMessage(){
 let msg=input.value;
 if(!msg) return;
 add(msg,"user");
 input.value="";

 if(step==0){
  bot("Hi 👋 Enter your monthly income to start");
  step=1;
 }
 else if(step==1){
  income=parseInt(msg);
  bot("Enter loan amount");
  step=2;
 }
 else if(step==2){
  loan=parseInt(msg);
  if(income>=25000){
    let emi=emiCalc(loan);
    bot(`🎉 Eligible! EMI approx ₹${emi}/month\nOur team would contact you.`);
  }else{
    bot("❌ Not eligible. Income must be above ₹25k");
  }
  step=0;
 }
}

function downloadChat(){
 let element=document.createElement('a');
 element.setAttribute('href','data:text/plain;charset=utf-8,'+encodeURIComponent(messages.innerText));
 element.setAttribute('download','chat.txt');
 element.click();
}