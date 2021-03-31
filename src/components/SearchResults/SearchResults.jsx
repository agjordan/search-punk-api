import React from 'react'
import BeerEntry from '../BeerEntry'
import styles from './SearchResults.module.scss'

function SearchResults({searchResults}) {
    return (
        
        <div className={styles.searchResults}>
        <div className={styles.cardContainer}>
            {searchResults && searchResults.map(beer => <BeerEntry beer={beer}/> )}
        </div>
        </div>
    )
}

export default SearchResults
