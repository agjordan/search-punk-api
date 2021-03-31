import React, { useState } from "react";
import styles from "./SearchBar.module.scss";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

function SearchBar({ searchParams, updateSearchParams }) {
  const [showFilters, setShowFilters] = useState(false);

  const toggleShowFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className={styles.searchBar}>
      <h1>BrewDog API Search</h1>
      <input
        type="text"
        placeholder="Search through beers!"
        className={styles.searchTextInput}
        onChange={(e) => updateSearchParams("text", e.target.value)}
      />

      <div className={styles.filters}>
        <div className={styles.showFiltersButton} onClick={toggleShowFilters}>
          {showFilters ? "Hide Filters": "Show Filters"}
        </div>
        <div className={styles.filterInputs}>
          {showFilters && (
            <div className={styles.rangeContainer}>

              <div className={styles.rangeLabel}>Alcohol by Volume</div>
              <Range
                min={0}
                max={60}
                step={1}
                defaultValue={[searchParams.ABV.min, searchParams.ABV.max]}
                allowCross={false}
                draggableTrack={true}
                onAfterChange={(value) => {
                  updateSearchParams("ABV", {min:value[0], max:value[1]});
                }}
              />

              <div className={styles.rangeLabel}>Bitterness (IBU)</div>
              <Range
                min={0}
                max={260}
                step={10}
                defaultValue={[searchParams.IBU.min, searchParams.IBU.max]}
                allowCross={false}
                onAfterChange={(value) => {
                  updateSearchParams("IBU", {min:value[0], max:value[1]});
                }}
              />

              <div className={styles.rangeLabel}>Color (EBC)</div>
              <Range
                min={0}
                max={80}
                step={1}
                defaultValue={[searchParams.EBC.min, searchParams.EBC.max]}
                allowCross={false}
                onAfterChange={(value) => {
                  updateSearchParams("EBC", {min:value[0], max:value[1]});
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
