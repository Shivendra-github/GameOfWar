let fetch_btn = document.getElementById('new-deck-btn');
let draw = document.getElementById('draw-card');
let topCard = document.getElementById('cardOne');
let bottomCard = document.getElementById('cardTwo');
let deckId ='';   

const cardsArray = ['0','1','2','3','4','5','6','7','8','9','10','JACK','QUEEN','KING','ACE'];
let cardOneValue =0;
let cardTwoValue =0;

let playerOneScore =0;
let playerTwoScore =0;


// Getting the deck of cards from API
function handle_click(){

    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/",{method:"GET"})
        .then(response => response.json())
        .then(data => {deckId=data.deck_id
            document.getElementById('remaining').innerText= data.remaining;
        
        })

        document.getElementById('draw-card').innerHTML= `<button id="draw-btn">Draw </button>`;
        
        


}
fetch_btn.addEventListener('click',handle_click)



draw.addEventListener('click',()=>{

    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res=>res.json())
        .then(data=>{
        
        

        topCard.innerHTML= ` <img src=" ${data.cards[0].image}" alt="">`;
        bottomCard.innerHTML= ` <img src=" ${data.cards[1].image}" alt="">`;

        cardOneValue= data.cards[0].value;
        cardTwoValue= data.cards[1].value;

        document.getElementById('remaining').innerText= data.remaining;

        if(cardsArray.indexOf(cardOneValue)>cardsArray.indexOf(cardTwoValue)){


            playerTwoScore += parseInt(cardsArray.indexOf(cardOneValue));
            document.getElementById('computerscore').innerText=playerTwoScore;
            document.getElementById('main-heading').innerText='Card 2 Wins!'
            

            

        }
        else if(cardsArray.indexOf(cardOneValue)<cardsArray.indexOf(cardTwoValue)){

           

            playerOneScore += parseInt(cardsArray.indexOf(cardTwoValue));
            document.getElementById('myscore').innerText=playerOneScore;
            document.getElementById('main-heading').innerText='Card 1 Wins!'
            

        }

        if(data.remaining==0){
            document.getElementById('draw-btn').disabled = true;

            if(playerOneScore>playerTwoScore){

                if(data.remaining==0){
                    document.getElementById('main-heading').innerText = 'You Won!'
        
                    
        
                }


            }
            else if(playerOneScore<playerTwoScore){

                document.getElementById('main-heading').innerText = 'Computer Won!'



            }

            

        }


        
    
    
    
    
    
    })
        
        


        


})



