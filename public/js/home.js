const productDivs = document.querySelectorAll('.product-div');
const username = document.querySelector('#navbarDropdown');

productDivs.forEach(pd => {
  pd.addEventListener('click', e => {
    const route = pd.children[0].getAttribute('routeName');
    const link = route.replace('$', username.textContent.trim());

    window.location.href = link;
  });
});
