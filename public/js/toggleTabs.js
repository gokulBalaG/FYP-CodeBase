const btnPlot = document.querySelector('.btn-plot');
const btnTable = document.querySelector('.btn-table');

const plotTab = document.querySelector('.plot-tab');
const tableTab = document.querySelector('.table-tab');

const onClickColor = '#d3d3d3';
const unfocusColor = '#f8f8f8';

const btnPlotEvent = function (e) {
  btnPlot.style.backgroundColor = onClickColor;
  btnTable.style.backgroundColor = unfocusColor;

  plotTab.classList.remove('hidden');
  tableTab.classList.add('hidden');
};

const btnTableEvent = function (e) {
  btnTable.style.backgroundColor = onClickColor;
  btnPlot.style.backgroundColor = unfocusColor;

  tableTab.classList.remove('hidden');
  plotTab.classList.add('hidden');
};

// to show plot on click
btnPlot && btnPlot.addEventListener('click', btnPlotEvent);
// to show table onn click
btnTable && btnTable.addEventListener('click', btnTableEvent);
