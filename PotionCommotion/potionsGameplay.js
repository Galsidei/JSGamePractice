var cardBack = 'back.png';
var picToMatch = ['0.png','1.png','2.png','3.png','4.png','5.png',
'6.png','7.png','8.png','9.png','10.png','11.png',
'12.png','13.png','14.png'];

var card = [];

function randOrd() //(a, b)
{
  return (Math.round(Math.random())-0.5);
}



for (var i = 0; i < 15; i++)
{
  card[i] = new Image();
  card[i].src = picToMatch[i];
  picToMatch[i] = '<img src="images/'+picToMatch[i]+'" width="60" height="60" alt="Picture To Match" \/>';
  picToMatch[i+15] = picToMatch[i]; //Add the card image's duplicate at the end of the complete set
}

//Show the back face of a given card
function displayBack(i)
{
  document.getElementById('c'+i).innerHTML = '<div onclick="disp('+i+');return false;"><img src="images/'+cardBack+'" width="60" height="60" alt="Card Back" \/><\/div>';
}

var firstChoice, secondChoice, timer, turnedCards, timerInterval, concealmentCountdown, successfulMatches;

window.onload=start;  //Trigger the game initialisation

function start()
{
  //Deal the cards, face down
  for (var i = 0; i <= 29 ;i++)
    displayBack(i);

  clearInterval(timerInterval); //reset the timer
  timer = turnedCards = successfulMatches = 0; // initialise control vars
  picToMatch.sort( randOrd ); //Shuffle the deck
  counter();  //Initialise the time counter
  timerInterval = setInterval('counter()', 1000);  //The timer will increment each second
}

//Track the time spent by the player on this level
function counter()
{
  var min = Math.floor(timer/60);
  var sec = timer%60;
  document.getElementById('clock').value = min+':'+ (sec<10 ? '0' : '') + sec;  // Display new time
  timer++;  //increment time by 1 second
}

//Handles display of selected cards
function disp(sel)  // sel = DOM element clicked by player
{
  if (turnedCards>1)  //More than two cards have been selected
  {
    clearTimeout(concealmentCountdown);
    conceal();  //Hide the cards
  }

  document.getElementById('c'+sel).innerHTML = picToMatch[sel];  //Turn over the clicked card to show its image

  if (turnedCards==0) //if this is the first card clicked
    firstChoice = sel; //Store it as the player's first choice
  else {
    secondChoice = sel; //Store the player's second choice
    concealmentCountdown = setTimeout('conceal()', 900);  //If the cards dont match, turn them over in 9/10ths of a second, otherwise leave visible.
  }
  turnedCards++;  //Increment the number of cards currently turned
}

//If the cards dont match, turn them over in 9/10ths of a second, otherwise leave visible.
function conceal()
{
  turnedCards = 0;  //Reset the number of turned cards for the player's next move

  if (picToMatch[firstChoice] != picToMatch[secondChoice])  //If the two turned cards don't match, flip them
  {
    displayBack(firstChoice);
    displayBack(secondChoice);
  } else  // The turned cards match.  leave them visible and increment the number of successful matches
    successfulMatches++;

  if (successfulMatches >= 15)  //All of the cards have been matched
    clearInterval(timerInterval);  //Stop the timer
}
