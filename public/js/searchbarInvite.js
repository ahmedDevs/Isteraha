function sendData(e) {
    const searchResults = document.getElementById('searchResults')
    let match = e.value.match(/^[a-zA-z ]*/)
    let match2 = e.value.match(/\s*/)
    if(match2[0] === e.value) {
      searchResults.innerHTML = ''
      return
    }
    if(match[0] === e.value) {
      fetch('/searchUsernames', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ search: e.value }),
    }) .then(res => res.json()) 
      .then(data => {
        let search = data.search
        searchResults.innerHTML = ''
        if(search.length < 1) {
          searchResults.innerHTML = '<p>No results</p>'
          return
        }
        search.forEach((el,i) => {
          if(i > 0) searchResults.innerHTML += '<hr>'
          searchResults.innerHTML += `<p>${el.userName}</p>`
        })
    })
    return 
    }
    searchResults.innerHTML = ''
  }