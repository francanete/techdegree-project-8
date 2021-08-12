let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");

let next = document.getElementById('next');
let prev = document.getElementById('prev');



// fetch data from API

fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err))



function displayEmployees(employeeData) { 
    employees = employeeData;

// store the employee HTML as we create it 
let employeeHTML = '';

// loop through each employee and create HTML markup 
employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city; 
    let picture = employee.picture;

// console.log(employees)

// template literals make this so much cleaner!

employeeHTML += `
<div class="card" data-index="${index}">
    <img class="avatar" src="${picture.large}" />
    <div class="text-container">
      <h2 class="name">${name.first} ${name.last}</h2>
      <p class="email">${email}</p>
      <p class="address">${city}</p>
    </div>
  </div>
`
});
  gridContainer.innerHTML = employeeHTML;
}




function displayModal(index) {

// use object destructuring make our template literal cleaner
    let { name, dob, phone, email, location: { city, street, state, postcode }, picture } = employees[index];
    let date = new Date(dob.date);

    const modalHTML = `
        <img class="avatar" src="${picture.large}" />
        <div class="text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
            <hr />
            <p>${phone}</p>
            <p class="address">${street.number} ${street.name}, ${city}, ${state} ${postcode}</p>
            <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
    `;
    overlay.classList.remove("hidden");
        modalContainer.innerHTML = modalHTML;
}




let nextModal;
let prevModal;

gridContainer.addEventListener('click', e => {
    // make sure the click is not on the gridContainer itself
    if (e.target !== gridContainer) {
    // select the card element based on its proximity to actual element clicked
    const card = e.target.closest(".card");
    const index = card.getAttribute('data-index');
    nextModal = index;
    prevModal = index;
    displayModal(index);
    }
    // console.log(next(prevModal))
});

next.addEventListener("click", () => {
    if (nextModal !== 11){
        displayModal(nextModal++);
    } else {
        displayModal(nextModal++)
    }    
})

prev.addEventListener("click", () => {
    if (prevModal === 0){
        displayModal(prevModal--);
    } else {
        prevModal = 11;
        displayModal(prevModal--) 
    }   
})




modalClose.addEventListener('click', () => {
    overlay.classList.add('hidden');
});



function searchPage() {
    const header = document.querySelector('.header');
    const label = document.createElement('label');
    label.htmlFor = 'search';
    label.className = 'student-search';
    header.insertAdjacentElement('beforeend', label);
 
    const input = document.createElement('input');
    input.id = 'search';
    input.placeholder = 'Search by name...';
    label.insertAdjacentElement('beforeend', input);
 }
 searchPage();



 
const search = document.getElementById('search');

search.addEventListener('keyup', (e) => {
   const searchName = e.target.value.toLowerCase();
   const filteredCharacters = employees.filter((employee) => {
      return (
         employee.name.first.toLowerCase().includes(searchName) ||
         employee.name.last.toLowerCase().includes(searchName)
         );
      });
      displayEmployees(filteredCharacters);
      console.log(filteredCharacters);
      console.log(employees);
});

