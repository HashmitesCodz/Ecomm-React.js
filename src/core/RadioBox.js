import React, {useEffect, useState, Fragment} from 'react';

const RadioBox = ({prices, handleFilters})=>{
    const [values, setValues] = useState(0)

    const handleChange = event=>{
        handleFilters(event.target.value)
        setValues(event.target.value)
    }

    return prices.map((p, i)=>(
        <div key={i}>
            <input onChange={handleChange}
            value={`${p._id}`}
            type="radio" name={p}
            className="mr-2 ml-4"/>
            <label className="form-check-label">{p.name}</label>
        </div>
    ))
}

export default RadioBox;