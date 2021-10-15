import React, {useState, useEffect} from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories, getFilteredProducts } from "./apiCore";
import Checkbox from "./Checkbox";
import { prices } from "./fixedPrices";
import RadioBox from "./RadioBox";

const Shop = ()=>{
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);
    const [size, setSize] = useState(0)
    const [myFilters, setMyFilters] = useState({
        filters:{category:[], price:[] }
    });

    const init = ()=>{
        getCategories().then((data)=>{
            if(data.error){
                setError(data.error)
            }else{
                setCategories(data)
            }
        })
    }
    const loadFilteredResults = newFilters => {
        // console.log(newFilters)
        // console.log("filteredProducts", getFilteredProducts(skip, limit, newFilters))
        // console.log("skip", skip)
        // console.log("limit", limit)
        // console.log("newFilters", newFilters)
        getFilteredProducts(skip, limit, newFilters).then(data=>{
            if(data.error){
                setError(data.error)
            }else{
                // console.log("data", data.data)
                setFilteredResults(data.data);
                setSize(data.size)
                setSkip(0)
               
            }
        })
    }

    const loadMore = ()=>{
        let toSkip = skip + limit
        getFilteredProducts(toSkip, limit, myFilters.filters).then(data=>{
            if(data.error){
                setError(data.error)
            }else{
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size);
                setSkip(toSkip)
            }
        })
    }

    const loadMoreButton = ()=>{
        return(
        size > 0 && size >= limit && (
            <button onClick={loadMore} className="btn btn-danger mb-5">Load More</button>
        )
    )
}

    useEffect(()=>{
        init();
        loadFilteredResults(skip, limit, myFilters.filters)
    }, []);

  
    const handleFilters = (filters, filterBy)=>{
        // console.log(filters, filterBy)
        const newFilters = {...myFilters};
        newFilters.filters[filterBy] = filters
        console.log("uppre filterBy", filterBy)
        if(filterBy == 'price'){
            // console.log("filters", filters)
            let priceValues = handlePrice(filters)
            // console.log("price",priceValues)
            newFilters.filters[filterBy] = priceValues
            // console.log("new",newFilters)
            // console.log("filterby", filterBy)
        }
        loadFilteredResults(myFilters.filters)
        setMyFilters(newFilters)
    }

    const handlePrice = value =>{
        const data = prices;
        let array = [];
        for(let key in data){
            // console.log("value", parseInt(value))
            if(data[key]._id === parseInt(value)){
                array = data[key].array;
            }
        }
        return array;

    }

   
    return(
        <Layout title="Shopping Store" description="Search your books here"
         className="container-fluid">
             <div className="row">
                <div className="col-4">
                    <h4>Filter By Categories</h4>
                    <ul>
                    <Checkbox categories={categories} handleFilters={filters=>handleFilters(filters, 'category')}/>
                    </ul>
                    <h4>Filter By Price Range</h4>
                    <div>
                    <RadioBox prices={prices} handleFilters={filters=>handleFilters(filters, 'price')}/>
                    </div>
                    
                </div>
            <div className="col-8">
                <h2 className="mb-4">Products</h2>
                <div className="row">
                {filteredResults.map((product, i)=>(
               <div key={i} className="col-4 mb-3">
               <Card product={product}/>
           </div>
                ))}
                  {/* {JSON.stringify(filteredResults)}  */}

                </div>
                <hr/>
                {loadMoreButton()}
                </div>
            </div>    
    
        </Layout>
        )
}

export default Shop;