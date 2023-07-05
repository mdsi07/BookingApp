// Put DOM elements into variables
const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
//const userList = document.querySelector('#users');

// Listen for form submit
myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  
  if(nameInput.value === '' || emailInput.value === '') 
  {
    // alert('Please enter all fields');
    msg.classList.add('error');
    msg.innerHTML = 'Please enter all fields';

    // Remove error after 3 seconds
    setTimeout(() => msg.remove(), 3000);
  }

  else
  {
    // Create new list item with user
    //const li = document.createElement('li');

    // Add text node with input values
    //li.appendChild(document.createTextNode(`${nameInput.value}: ${emailInput.value}`));

    // Add HTML
    // li.innerHTML = `<strong>${nameInput.value}</strong>: ${emailInput.value}`;

    // Append to ul
    //userList.appendChild(li);

    //Local Storage
    // localStorage.setItem('name:',nameInput.value);
    // localStorage.setItem('email:',emailInput.value);

    // Storing input values
    const name = e.target.name.value;
    const email = e.target.email.value;

    // Creating Object
    let userDetails = {
      name,
      email
    }

    // convert object to String
    let userDetails_serialized = JSON.stringify(userDetails);

    // Objects to Local Storage
    localStorage.setItem(userDetails.email,userDetails_serialized);

    // if we want String to Objects then
    // let userDetails_deserialized = JSON.parse(localStorage.getItem('userDetails'));

    showListofRegisteredUser(userDetails);

    // Clear fields
    nameInput.value = '';
    emailInput.value = '';
  }
}

window.addEventListener('DOMContentLoaded', (e) => {
  Object.keys(localStorage).forEach(key => {
      const user = JSON.parse(localStorage.getItem(key))
      showListofRegisteredUser(user)
  })
})

function showListofRegisteredUser(user) {
  const parentNode = document.getElementById('users');
  const createNewUserHtml = `<li id='${user.email}'>${user.name} - ${user.email}
  <button onclick=deleteUser('${user.email}')>Delete</button> </li>`
  console.log(createNewUserHtml)
  parentNode.innerHTML +=  createNewUserHtml;
  console.log(parentNode.innerHTML)
}

function deleteUser(email) {
  localStorage.removeItem(email)
  removeItemFromScreen(email)
}

function removeItemFromScreen(email) {
  const parentNode = document.getElementById('users');
  const elem = document.getElementById(email)
  parentNode.removeChild(elem);
}