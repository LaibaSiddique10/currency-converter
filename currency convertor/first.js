const Base_URL=` https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

const  dropdown=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
const msg=document.querySelector("#msg");

for(let select of dropdown)
{
    for(let currcode in countryList)
    {
     //   console.log(currcode , countryList[currcode]); for currcode, countrycode
        let newOption=document.createElement("option");
        newOption.innerText=currcode;
        select.append(newOption);
        if(currcode === "USD" && select.name ==="From")
       {
            newOption.selected="true";
       }
     else if(currcode === "PKR" && select.name ==="To")
       {
            newOption.selected="true";
       }
   }
        select.addEventListener("change",(evt)=>{
            updateFlag(evt.target);
        });
}
let updateFlag =(element)=>{
let currcode =element.value;
let countrycode=countryList[currcode];
let newSrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
let img=element.parentElement.querySelector("img");
img.src=newSrc;
};

const updateExhangeRate= async ()=> {
    let amount =document.querySelector(".amt input");
    let amtVal=amount.value;
    if(amtVal === ""  ||  amtVal < 0 )
    {
        amtVal=1; //in memory
        amount.value="1"; //on screen
    }

 let response= await fetch(Base_URL);
let data= await response.json();
let fromexhcahngerates=data.conversion_rates[fromcurr.value];
let toexhcahngerates=data.conversion_rates[tocurr.value];
// console.log(fromexhcahngerates);
// console.log(toexhcahngerates);
let finalVal=amtVal * toexhcahngerates / fromexhcahngerates;
msg.innerText=`${amtVal} ${fromcurr.value}= ${finalVal .toFixed(3)} ${tocurr.value}`;
}


btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
   updateExhangeRate();
});