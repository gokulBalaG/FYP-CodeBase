const emailInput = document.querySelector('.email');
const btnSubmit = document.querySelector('.btn-submit');

// (1) for rendering error when email is already registered
const inpErrDiv = document.querySelector('.error');

// (2) for rendering error when login fails
const errOnSubmit = document.querySelector('.error-on-submit');
const errCloseBtn = document.querySelector('.span-close-btn');

//
//

// look for un-focus event of user on password field of the form to trigger this func

emailInput &&
  emailInput.addEventListener('blur', async () => {
    const url = `/checkIfUsername?email=${emailInput.value}`;

    // send a req to the above route with the username to check if it exists
    const res = await fetch(url);
    const resJson = await res.json();

    // if exists then unhide error
    if (!resJson.userExists) inpErrDiv.classList.remove('hidden');
    else inpErrDiv.classList.add('hidden');

    // disable / enable submit btn accordingly
    if (inpErrDiv.classList.contains('hidden')) btnSubmit.disabled = false;
    else btnSubmit.disabled = true;
  });

// for (2)
errCloseBtn &&
  errCloseBtn.addEventListener('click', e => {
    errOnSubmit.style.display = 'none';
    errOnSubmit.classList.add('hidden');
  });
