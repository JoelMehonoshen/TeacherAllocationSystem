
function fetchResultsNew(qString) {
    // console.log(qString); 
      const url = `http://localhost:3001/${qString}`; 
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
  
  export default fetchResultsNew; 