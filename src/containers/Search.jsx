import React, { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import SearchResults from '../components/SearchResults'
import { getBeers } from '../service/punkAPI.service'

function Search() {
    const defaultSearchParams = {ABV: {min:0, max:100}, IBU: {min:0, max:250}, EBC: {min:0, max:80}, text:''}
    const [searchParams, setSearchParams] = useState(defaultSearchParams)
    const [searchResults, setSearchResults] = useState('')

    useEffect(() => {

        const updateSearch = async () => {
            console.log(searchParams)
            let beers = await getBeers(searchParams)
            setSearchResults(beers)
            console.log(beers)
        }
        
        updateSearch()
        

    }, [searchParams])
    
    const updateSearchParams = async (param, value) => {
        console.log(searchParams)
        let temp = {...searchParams}
        temp[param] = value

        setSearchParams(temp)
    }

    return (
        <div >
            <SearchBar searchParams={searchParams} updateSearchParams={updateSearchParams}/>
            <SearchResults searchResults={searchResults}/>
        </ div>
    )
}

export default Search
