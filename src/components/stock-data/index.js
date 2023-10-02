import React, { useCallback } from "react";
import "./index.css";
import { useState, useEffect } from "react";

export default function StockData() {

  const [search, setSearch] = useState("")
  const [input, setInput] = useState("")
  const [displayStockList, setDisplayStockList] = useState(false)
  const [stockList, setStockList] = useState([])
  const searchStock = useCallback((e) => {
    debugger
    setInput(search)
    
  },[search])

  useEffect(()=>{
    if(input!==''){
      setDisplayStockList(true);
    }else{
      setDisplayStockList(false)
    }
    if(input){
      let val = input.replace(/["']/g, "")
      fetch(`https://jsonmock.hackerrank.com/api/stocks?date=${val}`)
      .then((res)=> res.json())
      .then((data)=>{
        console.log(data)
        setStockList(data.data)
      })
    }
  },[input])
  console.log("stockList", stockList)

  const stocks= displayStockList && stockList.map((el, index)=>
         <div key={el.index}>
           <li className="py-10">{`open: ${el.open}`}</li>
           <li className="py-10">{`high: ${el.high}`}</li>
           <li className="py-10">{`low: ${el.low}`}</li>
           <li className="py-10">{`close: ${el.close}`}</li>
          </div>
    )

  return (
    <div className="layout-column align-items-center mt-50">
      <section className="layout-row align-items-center justify-content-center">
        <input type="text" className="large" placeholder="5-January-2000" id="app-input" data-testid="app-input" onChange={(e)=> setSearch(e.target.value)}/>
        <button className="" id="submit-button" data-testid="submit-button" onClick = {searchStock}>Search</button>
      </section>
      <ul className="mt-50 slide-up-fade-in styled" id="stockData" data-testid="stock-data">
        {stocks}
      </ul>
      {!displayStockList && (<div className="mt-50 slide-up-fade-in" id="no-result" data-testid="no-result"></div>)}
    </div>
  );
}
