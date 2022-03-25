"use strict";

const productDivs = document.querySelectorAll(".product-div");

productDivs.forEach((pd) => {
  pd.addEventListener("click", (e) => {
    const route = pd.children[0].getAttribute("routeName");

    window.location.href = `/${route}`;
  });
});
