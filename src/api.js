const rootURL = 'http://localhost:3000';
const monstersURL = rootURL + '/monsters';
let monstersLimit = 50;

getMonsters = (limit, page) => {
  return fetch(`${monstersURL}/?_limit=${limit}&_page=${page}`)
    .then(resp => resp.json())
}

createMonster = monster => {
  return fetch(monstersURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify(monster)
  }).then(resp => resp.json())
}
