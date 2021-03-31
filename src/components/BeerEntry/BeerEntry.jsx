import React, { useState } from "react";
import styles from "./BeerEntry.module.scss";

function BeerEntry({ beer }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const descriptionFormatter = (string) => {
    return string.length < 200 ? string : string.slice(0,200) + '...'
  }

  return (
    <div className={styles.entry}>
      <div className={styles.beerHeadline} onClick={toggleExpanded}>
        <div className={styles.headlineDiv} id={styles.beerName}> {beer.name} </div>
        <div className={styles.headlineDiv} id={styles.beerTag}> {beer.tagline} </div>
        <div className={styles.headlineDiv} id={styles.beerABV}> {beer.abv} </div>
      </div>
      {expanded && (
          <div className={styles.beerBody}>
            <img src={beer.image_url} alt="" />
            <div className={styles.beerDescription}>
              <div className={styles.description}>{descriptionFormatter(beer.description)}</div>
              <div className={styles.descriptionDetailContainer}>
              {beer.ebc && <div className={styles.descriptionDetail} id={styles.ebc}> EBC: {beer.ebc}</div>}
              {beer.ibu && <div className={styles.descriptionDetail} id={styles.ebc}> IBU: {beer.ibu}</div>}
            </div>
            </div>

          </div>
        )}
    </div>
  );
}

export default BeerEntry;
