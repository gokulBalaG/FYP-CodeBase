const btnPlot = document.querySelector('.btn-plot');
const btnTable = document.querySelector('.btn-table');

const plotTab = document.querySelector('.plot-tab');
const tableTab = document.querySelector('.table-tab');

const onClickColor = '#d3d3d3';
const unfocusColor = '#f8f8f8';

btnPlot.addEventListener('click', e => {
  btnPlot.style.backgroundColor = onClickColor;
  btnTable.style.backgroundColor = unfocusColor;

  plotTab.classList.remove('hidden');
  tableTab.classList.add('hidden');
});

btnTable.addEventListener('click', e => {
  btnTable.style.backgroundColor = onClickColor;
  btnPlot.style.backgroundColor = unfocusColor;

  tableTab.classList.remove('hidden');
  plotTab.classList.add('hidden');
});
