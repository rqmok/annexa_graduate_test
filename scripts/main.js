function getTotalRecoveredPerMonth(data) {
  return d3.rollup(data, (d) => d3.sum(d, d => d.recovered), (d) => d.date.split('-')[1])
}

function handleData(data) {
  const victoriaData = getTotalRecoveredPerMonth(data.filter((d) => d.state_abbrev === 'VIC'));
  const westernAustraliaData = getTotalRecoveredPerMonth(data.filter((d) => d.state_abbrev === 'WA'));

  console.log(victoriaData);
  console.log(westernAustraliaData);

  generateChart(
    document.querySelector('#victoriaChart').getContext('2d'),
    victoriaData,
    'Victorian Recoveries',
  );

  generateChart(
    document.querySelector('#westernAustraliaChart').getContext('2d'),
    westernAustraliaData,
    'Western Australian Recoveries',
  );
}

function generateChart(context, data, title) {
  new Chart(context, {
    type: 'bar',
    data: {
      labels: [...data.keys()],
      datasets: [{
        label: 'Total Number of Recoveries',
        data: [...data.values()],
      }],
    },
    options: {
      legend: false,
      title: {
        display: title != null,
        text: title ? title : '',
      }
    },
  });
}

d3.csv('../data/COVID_AU_state_daily_change.csv')
  .then((data) => handleData(data))
  .catch((error) => console.log(error));
