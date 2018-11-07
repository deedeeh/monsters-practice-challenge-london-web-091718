const monsterList = document.querySelector('#monster-container');
const monsterForm = document.querySelector('#monster-form');
const nameInput = document.querySelector('#name');
const ageInput = document.querySelector('#age');
const descriptionInput = document.querySelector('#description');
const backBtn = document.getElementById('back')
const forwardBtn = document.getElementById('forward')
const errorsUl = document.getElementById('errors')


const state = {
  monsters: [],
  page: 1,
  limit: 50
}

const nextPage = () => {
  state.page++
  getMonsters(state.limit, state.page)
    .then(monsters => {
      monsterList.innerHTML = '';
      renderMonsters(monsters)
    })
}

const previousPage = () => {
  state.page--
  getMonsters(state.limit, state.page)
  .then(monsters => {
    monsterList.innerHTML = '';
    renderMonsters(monsters)
  })
}

const showErrors = errors => {
  errors.forEach(error => {
    const errorItem = document.createElement('li')
    errorItem.innerHTML = error
    errorItem.classList.add('error')
    errorsUl.appendChild(errorItem)
  })
}

const checkValidation = monster => {
  const errors = []
  if(monster.name.length < 4 && monster.name.length > 20) {
    errors.push('Monster name should be longer than 4 & less than 20 characters')
  } else if(typeof(monster.age) !== 'number') {
    erros.push('Monster age should be a number')
  } else if(monster.description.length < 12 && monster.description.length > 35) {
    errors.push('Monster description should be longer than 12 & less than 35 characters')
  }
  return errors
}

const clearErrors = () => {
  errorsUl.innerHTML = ''
}

const renderMonster = monster => {
  const monsterItem = document.createElement('div')
  monsterItem.className = 'monster-class'
  monsterItem.innerHTML =
  `<h2>${monster.name}</h2>
  <h5>Age: ${monster.age}</h5>
  <p>Bio: ${monster.description}</p>
  `
  monsterList.appendChild(monsterItem)
}

const renderMonsters = monsters => {
  monsters.forEach(monster => renderMonster(monster))
}

const updateMonsters = monsters => {
  monsterList.innerHTML = ''
  renderMonsters(monsters)
}

monsterForm.addEventListener('submit', event => {
  event.preventDefault();
  console.log('Submit was triggered!')

  const monster = {
    name: nameInput.value,
    age: parseFloat(ageInput.value),
    description: descriptionInput.value
  }

  const monsterErrors = checkValidation(monster)
  clearErrors()
  if(monsterErrors.length === 0){
    createMonster(monster)
      .then(monster => renderMonster(monster))
    monsterForm.reset();
  } else {
    showErrors(monsterErrors)
  }
})



forwardBtn.addEventListener('click', nextPage)

backBtn.addEventListener('click', previousPage)

getMonsters(state.limit, state.page)
  .then(monsters => {
    state.monsters = monsters
    updateMonsters(monsters)
  })
