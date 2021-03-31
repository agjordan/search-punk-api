import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import { getBeers } from "../service/punkAPI.service";

function Search() {
  const defaultSearchParams = {
    ABV: { min: 0, max: 100 },
    IBU: { min: 0, max: 250 },
    EBC: { min: 0, max: 80 },
    text: "",
    perPage: 20,
    page: 1,
    previousResults: undefined
  };
  const [searchParams, setSearchParams] = useState(defaultSearchParams);
  const [searchResults, setSearchResults] = useState("");
  const [end, setEnd] = useState(false)

  useEffect(() => {
    const updateSearch = async () => {
      if (searchParams.previousResults) {
        let query = await getBeers(searchParams)
        let newResults = [...searchParams.previousResults, ...query]
        if (query[query.length - 1] === "end of results") setEnd(true)
        setSearchResults(newResults)
      } else {
      let beers = await getBeers(searchParams);
      setSearchResults(beers);}
    };

    updateSearch();
  }, [searchParams]);

  const updateSearchParams = async (param, value) => {
    console.log(searchParams);
    let temp = { ...searchParams };
    temp[param] = value;
    temp.previousResults = null;
    temp.page = 1;
    setEnd(false)
    setSearchParams(temp);
  };

  const nextPage = async () => {
    let temp = {...searchParams}
    temp.page++
    temp.previousResults = [...searchResults]
    setSearchParams(temp)
  }

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && !end) nextPage();
  };

  return (
    <div onScroll={handleScroll} style={{"height":"100vh", "overflowY":"scroll"}}>
      <SearchBar
        searchParams={searchParams}
        updateSearchParams={updateSearchParams}
      />
      <SearchResults searchResults={searchResults} />
    </div>
  );
}

export default Search;
