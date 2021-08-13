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
    .then(storeFetchedEmployees)
    .catch(err => console.log(err))


function storeFetchedEmployees(employeeData) {
    employees = employeeData;
    displayEmployees(employeeData);
}


function displayEmployees(employeeData) { 

let employeeHTML = '';

employeeData.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city; 
    let picture = employee.picture;

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
            <p>Birthday: ${Intl.DateTimeFormat(navigator.language).format(date)}</p>
        </div>
    `;
    overlay.classList.remove("hidden");
        modalContainer.innerHTML = modalHTML;
}


let nextModal;
let prevModal;

let index;
let currentIndex;

gridContainer.addEventListener('click', e => {
    // make sure the click is not on the gridContainer itself
    if (e.target !== gridContainer) {
    // select the card element based on its proximity to actual element clicked
    const card = e.target.closest(".card");
    index = card.getAttribute('data-index');
    nextModal = index;
    prevModal = index;
    currentIndex = index;

    
    displayModal(index);
    console.log(index)
    // return currentIndex;
    }
    console.log(index)
    console.log(currentIndex)
});



next.addEventListener("click", () => {
    if (currentIndex >= 11){
        currentIndex = 0;
        displayModal(currentIndex)
        // return;        
    } else {
        currentIndex++;
        displayModal(currentIndex);
    }
    console.log(currentIndex)
})



prev.addEventListener("click", () =>{
    if (currentIndex <= 0){
        currentIndex = 11;
        displayModal(currentIndex)
        // return;
    } else {
        currentIndex--;
        displayModal(currentIndex);
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

    
    console.log(filteredCharacters);
    console.log(employees);
    displayEmployees(filteredCharacters);

});

console.log(navigator.language);


