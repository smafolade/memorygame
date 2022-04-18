import { useState, useEffect} from 'react';
import './App.css';
import Grid from "./Grid";
import {cardData} from "./data";


function App() {
  const [newGame, setNewGame] = useState(false);
  const [list, setList] = useState([]);
  const [visibleItems, setVisibleItems] = useState([]);
  const [finishedItems, setFinishedItems] = useState([]);
  const [winner, setWinner] = useState(false);
  const [cardNumber, setCardNumber] = useState(12)

  const checkItems = (firstIndex, secondIndex) => {
    if (
      firstIndex !== secondIndex &&
      list[firstIndex].url === list[secondIndex].url
    ) {
      setFinishedItems([...finishedItems, firstIndex, secondIndex]);
      setVisibleItems([]);
    } else {
      setTimeout(() => {
        setVisibleItems([]);
      }, 1000);
    }
  };

  
  useEffect(
    () => {
      if (finishedItems.length > 0 && finishedItems.length === list.length) {
        setWinner(true);
      }
    },
    [finishedItems, list.length]
  );


  const handleSubmit = () => {
    let randomUrl = ''; 
    let newList = []
    let randomId = 0
    let cardDataTemp = [...cardData];
    for (let i = 0; i < cardNumber / 2; i++) {
      randomId = Math.floor(Math.random()*cardDataTemp.length)
      randomUrl = cardDataTemp[randomId].url;
      cardDataTemp.splice(randomId,1)
      const firstOption = {
        id: 2 * i,
        url: randomUrl,
      }
      const secondOption = {
        id: 2 * i + 1,
        url: randomUrl,
      }
    
      newList.push(firstOption)
      newList.push(secondOption)
    }

    setList(
      newList
      .sort(() => {
        return 0.5 - Math.random();
      }))
//    console.log(cardDataTemp.length+' '+cardData.length)
    }


    return (
      <div className="text-center p-4 d-flex flex-column align-items-center">
        <h1>Memoriajatek</h1>
        <div>
          {list.length == 0 ? (
            <> 
              <form onSubmit={handleSubmit} >
                <label>Adj meg egy paros szamot 4 es 104 között:<br/>
                  <input type="number" min={4} max={104} step={2} value={cardNumber} onChange = { e => setCardNumber(e.target.value)} />
                </label><br/>
                <input type="submit" value="Jatszunk"/>
              </form>
            </>
            ) : (
            <>
              <button 
                onClick={() => {
                  setList([]);
                  setCardNumber(12)
                  setNewGame(!newGame);
                  setVisibleItems([]);
                  setFinishedItems([]);
                  setWinner(false);
                }}
                  className="btn btn-info mx-4 my-4" 
                >
                  Main Menu 
              </button>
            </>
            )}
        </div>

        {list.length !== 0 && (
          <div className="cardContainer">
            <Grid
              list={list}
              visibleItems={visibleItems}
              setVisibleItems={setVisibleItems}
              finishedItems={finishedItems}
              checkItems={checkItems}
            />
            {winner && (
              <div>
                Gratulalok!
              </div>
            )}
          </div>
        )}
        <div>
        </div> 
      </div>
    );  
}

export default App;
