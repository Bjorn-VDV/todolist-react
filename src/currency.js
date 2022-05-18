import React, { useState, useRef, useEffect } from 'react';

function Currency()
{
    const [amount, setAmount] = useState();
    const [result, setResult] = useState();
    const [fromCurr, setFromCurr] = useState();
    const [toCurr, setToCurr] = useState();
    var requestURL = 'https://api.exchangerate.host/convert?from=' + fromCurr + '&to=' + toCurr + '&amount=' + amount + '&places=2';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    const AmountRef = useRef();

    let handleCurrency = () =>
    {
        const number = AmountRef.current.value;
        setAmount(number)
        AmountRef.current.value = null;
    }

    request.onload = function ()
    {
        var response = request.response.result;
        setResult(response)
    }

    let handleFrom = (change) =>
    {
        setFromCurr(change.target.value)
    }

    let handleTo = (change) =>
    {
        setToCurr(change.target.value);
    }

    return (
        <>
            <div>
                FROM: <select id="currencyDrop1" onChange={handleFrom}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="SEK">SEK</option>
                    <option value="NOK">NOK</option></select>

                TO: <select id="currencyDrop2" onChange={handleTo}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="SEK">SEK</option>
                    <option value="NOK">NOK</option></select>
            </div>
            <input ref={AmountRef} type="text" placeholder="Input an amount..."></input>
            <button onClick={handleCurrency}>Currency</button>
            <div> {amount} {fromCurr} <br></br>
            has been converted to <br></br>
            {result} {toCurr}</div>
        </>
    )
}

export default Currency;