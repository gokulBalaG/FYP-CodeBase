const usernameInput = document.querySelector('.username');
const errDiv = document.querySelector('.error');
const btnRegister = document.querySelector('.btn-register');

// look for un-focus event of user to trigger this func
usernameInput.addEventListener('blur', async () => {
  const url = `/checkIfUsername?username=${usernameInput.value}`;

  // send a req to the above route with the username to check if it exists
  const res = await fetch(url);
  const resJson = await res.json();

  // if exists then unhide error
  if (resJson.userExists) errDiv.classList.remove('hidden');
  else errDiv.classList.add('hidden');

  // disable / enable submit btn accordingly
  if (errDiv.classList.contains('hidden')) btnRegister.disabled = false;
  else btnRegister.disabled = true;
});
