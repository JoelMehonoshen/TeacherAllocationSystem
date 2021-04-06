
// General purpose fetch function
// Takes in the query string
// Only works for use with allocations right now
// Change over to work with all queries
function fetchResults(qString) {
  // console.log(qString); 
    const url = `http://localhost:3001/allocations?${qString}`; 
    return fetch(url)
    .then(res => {
      if (res.ok) {
        return res.json(); 
      }
      throw new Error("Network response not ok"); 
    })
    .then(res => res)
    .catch(e => {
      console.log(e.message); 
    }); 
}

export default fetchResults; 