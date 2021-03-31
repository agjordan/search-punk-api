export const getBeers = async ({text, ABV, IBU, EBC, perPage, page}) => {

  const BASE_URL = "https://api.punkapi.com/v2/beers/?";

  let query_url = BASE_URL;
  if (ABV.min) query_url += `&abv_gt=${ABV.min}`;
  if (ABV.max) query_url += `&abv_lt=${ABV.max}`;
  if (IBU.min) query_url += `&ibu_gt=${IBU.min}`;
  if (IBU.max) query_url += `&ibu_lt=${IBU.max}`;
  if (EBC.min) query_url += `&ebc_gt=${EBC.min}`;
  if (EBC.max) query_url += `&ebc_lt=${EBC.max}`;
  if (text) query_url += `&beer_name=${text}`;
  query_url += `&per_page=${perPage}`;
  query_url += `&page=${page}`;

  const beers = await fetch(query_url)
    .then((response) => {
        return response.json()})
    .then((data) => data);

  if (beers.length < perPage) beers.push("end of results")
  return beers;
}