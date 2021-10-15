import React, {useEffect, useState} from 'react';


const Checkbox = ({categories, handleFilters })=>{
    const [checked, setChecked] = useState([]);

    const handleToggle = c => () =>{
        // returns the first index or -1
        const currentCategoryId = checked.indexOf(c)
        const newCheckedCategoryId = [...checked]

        if(currentCategoryId === -1){
            newCheckedCategoryId.push(c)
        }else{
            newCheckedCategoryId.splice(currentCategoryId, 1)
        }
       
        setChecked(newCheckedCategoryId)
        handleFilters(newCheckedCategoryId)
    }
    return categories.map((c, i)=>(
        <li key={i} className="list-unstyled">
            <input onChange={handleToggle(c._id)} value={checked.indexOf(c._id === -1)} className="form-check-input" type="checkbox"/>
            <label className="form-check-label">{c.name}</label>
        </li>
    ))
}

export default Checkbox;