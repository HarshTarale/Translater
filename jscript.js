
const myDialog = document.getElementById("myDialog");
const dialogCloseBtn = document.getElementById("dialogClose");
const btnSpeech = document.getElementById("btnSpeech");
const textArea1= document.getElementById("text");
const textArea2= document.getElementById("text2");
const fromSelect1= document.getElementById("fromSelect1");
const toSelect2= document.getElementById("toSelect2");
const btnSpeech_2= document.getElementById("btnSpeech2")
const convert = document.getElementById("convertBtn");
const btn2 = document.getElementById("btn2")


var textArea1_Value1;
// // Corrections 
// // use DOMContentLoaded rather than load event read about that 

document.addEventListener("DOMContentLoaded", () => {
         dialogOpen();
         setTimeout(()=>{ 
          speaker("initialising complete")

           myDialog.close();

         },2000)

    });

     function dialogOpen() {
           myDialog.showModal();
    }
   
      dialogCloseBtn.addEventListener("click", () => {
           myDialog.close();
           speaker(" hii im System your assistant.")
    });

      var setValue=[]
      
    if (setValue[0]==undefined){
          setValue[0] = "en-GB";
    }
    if(setValue[1]==undefined){
      setValue[1] = "en-GB";

    }
   
      const speaker=(text)=>{
           const  voice1= new SpeechSynthesisUtterance(text);
           window.speechSynthesis.speak(voice1);
    }

       textArea1.addEventListener("change",(event)=>{
           textArea1_Value1=event.target.value;
    }) 
    
       fromSelect1.addEventListener("change",(event)=>{
            setValue[0]=event.target.value;
            textArea1.placeholder=setValue[0];
            console.log(setValue[0])

    });

     toSelect2.addEventListener("change",(event)=>{
             setValue[1]=event.target.value;
             textArea2.placeholder=setValue[1];
             console.log(setValue[1])


    }) 
   

     convert.addEventListener("click",function(){
      if (textArea1_Value1 === undefined) {
      speaker("inter text")
      textArea1.style.border="solid 5px blue"
      setTimeout(()=>{
        textArea1.style.border="solid 2px rgba(0, 0, 0, 0.336)";
      },2000)
    }else{
         data()

     }})
     btnSpeech.addEventListener("click",  function(){

        if (textArea1_Value1 === undefined) {
         speaker("Enter input ")
        }else{
             speaker(textArea1_Value1)
        }


        if(setValue[1]==undefined){
               speaker("Which Languaeg do you want to convert ? Select that")
               textArea2.innerText="Select Second Language"
           }
              console.log("okk")
            console.log(textArea2)         
  
    });
   
      

   const recoder=()=>{
       btn2.style.animationName="mic";

    const speechRecoder = new webkitSpeechRecognition();
    if (setValue[0]==undefined){
      speechRecoder.lang = "en-GB";
    }else{
      speechRecoder.lang = setValue[0] ;
    }
    speechRecoder.onresult=function (event){
        const transcript = event.results[0][0].transcript;
        document.getElementById("text").value=transcript;
        textArea1_Value1=transcript
        btn2.style.animationName="m";
        speaker(transcript)
        data()
    }
    setTimeout(()=>{
      btn2.style.animationName="m";
    },5000)

    speechRecoder.start()
   }

   const data  =async()=>{

   
        const url = `https://api.mymemory.translated.net/get?q=${textArea1_Value1}&langpair=${setValue[0]}|${setValue[1]}`
         var fetchdata= await  fetch(url);
         var joso = await  fetchdata.json();
         var translet= joso.responseData.translatedText;
     if(translet=="PLEASE SELECT TWO DISTINCT LANGUAGES"){
     toSelect2.style.backgroundColor="rgba(0, 0, 0, 0.336)";
      speaker("select convert language")
     setTimeout(()=>{
       toSelect2.style.backgroundColor="white";
     },1000)
    
    }else{
         textArea2.innerText=translet;
    }
   
   }





btnSpeech_2.addEventListener("click",()=>{

  const text2value=textArea2.value;
  if(text2value == ""){
    speaker("Enter input")

  }else{
    var speech_2 = new SpeechSynthesisUtterance(text2value);
    speech_2.lang = setValue[1];
    window.speechSynthesis.speak(speech_2)
  }
  
})