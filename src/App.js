import React, { useState } from 'react';
import './App.css';

function App() {

  // IMG KEY
  const IMG_KEY = process.env.REACT_APP_IMG_KEY; 

  // state -> deckID, cardType(value), image
  let [deckID, setDeckID] = useState("new");
  let [userCardValue, setUserCardValue] = useState(0);
  let [compCardValue, setCompCardValue] = useState(0);
  let [cardImage, setCardImage] = useState([IMG_KEY]);
  let [cardImageComp, setCardImageComp] = useState([IMG_KEY]);

  const getCards = () => {
    fetch(`https://www.deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`)
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        if (deckID === "new") {
          setDeckID(deckID = data.deck_id);
        }

        // Assing the card url to the card state array
        setCardImage([...cardImage, data.cards[0].images.png]);
        setCardImageComp([...cardImageComp, data.cards[1].images.png]);

        // Assign the value of the card to the user
        if (data.cards[0].value === "KING") {
          setUserCardValue(userCardValue + 13);
        } else if (data.cards[0].value === "QUEEN") {
          setUserCardValue(userCardValue + 12);
        } else if (data.cards[0].value === "JACK") {
          setUserCardValue(userCardValue + 11);
        } else if (data.cards[0].value === "ACE") {
          setUserCardValue(userCardValue + 1);
        } else {
          setUserCardValue(userCardValue + parseInt(data.cards[0].value));
        }

        // stop hitting for the caluclator when the score is 18
        if (compCardValue >= 18 && compCardValue < 21) {
          setCompCardValue(compCardValue);
          setCardImageComp(cardImageComp);
        } else {

          // Assing the card url to the card state array
          setCardImageComp([...cardImageComp, data.cards[1].images.png]);

          // Assign the value of the card to the comp
          if (data.cards[1].value === "KING") {
            setCompCardValue(compCardValue + 13);
          } else if (data.cards[1].value === "QUEEN") {
            setCompCardValue(compCardValue + 12);
          } else if (data.cards[1].value === "JACK") {
            setCompCardValue(compCardValue + 11);
          } else if (data.cards[1].value === "ACE") {
            setCompCardValue(compCardValue + 1);
          } else {
            setCompCardValue(compCardValue + parseInt(data.cards[1].value));
          }
        }
      });

  }

  // check for win
  const checkForWin = () => {
    if (userCardValue === 21) {
      alert("User wins, You got 21!");
      setUserCardValue(userCardValue = 0);
      setCompCardValue(compCardValue = 0);
      let arr = ["https://deckofcardsapi.com/static/img/back.png"];
      setCardImage(cardImage = arr);
      setCardImageComp(cardImageComp = arr)
    } else if (compCardValue === 21) {
      alert("AI wins, It got 21!");  
      setUserCardValue(userCardValue = 0);
        setCompCardValue(compCardValue = 0);
        let arr = ["https://deckofcardsapi.com/static/img/back.png"];
        setCardImage(cardImage = arr);
        setCardImageComp(cardImageComp = arr);
    } else if (userCardValue >= 22) {
      alert("AI wins, You went over 21!");  
      setUserCardValue(userCardValue = 0);
        setCompCardValue(compCardValue = 0);
        let arr = ["https://deckofcardsapi.com/static/img/back.png"];
        setCardImage(cardImage = arr);
        setCardImageComp(cardImageComp = arr);
    } else if (compCardValue >= 22) {
        alert("User wins, AI went over 21!");  
        setUserCardValue(userCardValue = 0);
        setCompCardValue(compCardValue = 0);
        let arr = ["https://deckofcardsapi.com/static/img/back.png"];
        setCardImage(cardImage = arr);
        setCardImageComp(cardImageComp = arr);
    } else if (userCardValue > compCardValue && userCardValue <= 21 && compCardValue >= 18 && compCardValue < 21) {
        alert("User wins!");  
        setUserCardValue(userCardValue = 0);
        setCompCardValue(compCardValue = 0);
        let arr = ["https://deckofcardsapi.com/static/img/back.png"];
        setCardImage(cardImage = arr);
        setCardImageComp(cardImageComp = arr);
    } else if (compCardValue > userCardValue && compCardValue <= 21 && userCardValue >= 18 && userCardValue < 21) {
        alert("AI wins!");  
        setUserCardValue(userCardValue = 0);
        setCompCardValue(compCardValue = 0);
        let arr = ["https://deckofcardsapi.com/static/img/back.png"];
        setCardImage(cardImage = arr);
        setCardImageComp(cardImageComp = arr);
    }
  }

  return (
    <div className="App">
      <h1>BLACK<span>JACK</span></h1>
      <div className="game-wrapper">
        <div className='comp-cards'>
          <h3>Computer: {compCardValue}</h3>
          <ul>
            {cardImageComp.map(cardImageComp => (<img src={cardImageComp} />))}
          </ul>
        </div>
        <div className='user-cards'>
          <h3>User: {userCardValue}</h3>
          <ul>
            {cardImage.map(cardImage => (<img src={cardImage} />))}
          </ul>
        </div>
      </div>
      <div class="action-btn">
        <button onClick={getCards}>Hit</button>
        <>{checkForWin()}</>
      </div>
    </div>
  );
}

export default App;