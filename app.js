const qoutes = document.getElementById('qoutes')
const qoute_author = document.getElementById('qoute_author')
const btn = document.getElementById('btn')
const speechText = document.querySelector('.speech')
const copyText = document.querySelector('.copy')
const twitterPost = document.querySelector('.twitter')
synth = speechSynthesis;
btn.addEventListener("click",async function(){

    btn.classList.add('loading')
    btn.innerText = "Loading Quote...";
    await fetch('https://free-quotes-api.herokuapp.com/')
    .then((res)=>{
        return res.json()
    })
    .then((data)=>{
       qoutes.innerHTML = data.quote;
       qoute_author.innerHTML =  data.author;
      btn.innerHTML = "Next Qoutes"
       btn.classList.remove('loading')


    })

})

speechText.addEventListener("click", ()=>{
    if(!btn.classList.contains("loading")){
        let utterance = new SpeechSynthesisUtterance(`${qoutes.innerText} by ${qoute_author.innerText}`);
        synth.speak(utterance);
        setInterval(()=>{
            !synth.speaking ? speechText.classList.remove("active") : speechText.classList.add("active");
        }, 10);
    }
});


copyText.addEventListener("click", ()=>{
    navigator.clipboard.writeText(qoutes.innerText);
});

twitterPost.addEventListener("click", ()=>{
    let tweetUrl = `https://twitter.com/intent/tweet?url=${qoutes.innerText}`;
        window.open(tweetUrl, "_blank")
});