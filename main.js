// Put DOM elements into variables
const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const numberInput = document.querySelector('#phoneNumber')
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
//const userList = document.querySelector('#users');

// Listen for form submit
myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  
  if(nameInput.value === '' || emailInput.value === '' || numberInput.value === '') 
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
    const number = e.target.phoneNumber.value;
    const email = e.target.email.value;

    // Creating Object
    let userDetails = {
      name,
      number,
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
    numberInput.value = '';
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
  const createNewUserHtml = `<li id='${user.email}'>${user.name} - ${user.number} - ${user.email}
  <button onclick=editUser('${user.email}') style="color:blue" >Edit</button>
  <button onclick=deleteUser('${user.email}') style="color:red" >Delete</button> </li>`;
  //console.log(createNewUserHtml)
  
  console.log('');

  parentNode.innerHTML +=  createNewUserHtml;
  //console.log(parentNode.innerHTML)
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

function editUser(email) {
  
  // in local storage values are in String so, we convert it into Object and store it into temporary variable
  var temp1 = JSON.parse(localStorage.getItem(email))

  // after getting values in object, we store that values into temporary variable
  var temp2 = Object.values(temp1);

  // now storing the respective value's to the respective variable's
  var tempName = temp2[0];
  var tempNumber = temp2[1];
  var tempEmail = temp2[2];

  // now assign a variable's for respective input field's
  var nameSpan = document.getElementById('name');
  var numberSpan = document.getElementById('phoneNumber');
  var emailSpan = document.getElementById('email');

  // now set the values(edited text values) to the input field
  nameSpan.value = tempName;
  numberSpan.value = tempNumber;
  emailSpan.value = tempEmail;

  // console log for checking
  // console.log(nameSpan);
  // console.log(numberSpan);
  // console.log(emailSpan);
  
  // console.log('Name: [' + tempName + ']  Number: [' + tempNumber + ']  Email: [' + tempEmail + ']');

  // remove data from local storage as well as list present in the screen(interface)
  localStorage.removeItem(email)
  removeItemFromScreen(email)
}