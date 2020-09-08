function getTotalRecoveredPerMonth(data) {
  return d3.rollup(data, (d) => d3.sum(d, d => d.recovered), (d) => d.date.split('-')[1])
}

function getMonthsAsNames(months) {
  return months.map((month) => {
    switch (month) {
      case '01':
        return 'January';
      case '02':
        return 'February';
      case '03':
        return 'March';
      case '04':
        return 'April';
      case '05':
        return 'May';
      case '06':
        return 'June';
      case '07':
        return 'July';
      case '08':
        return 'August';
      case '09':
        return 'September';
      case '10':
        return 'October';
      case '11':
        return 'November';
      case '12':
        return 'December';
      default:
        return month;
    }
  });
}

function getTimeAtTimezone(timezone) {
  return moment().tz(timezone).format('hh:mm A')
}

function handleData(data) {
  const victoriaData = getTotalRecoveredPerMonth(data.filter((d) => d.state_abbrev === 'VIC'));
  const westernAustraliaData = getTotalRecoveredPerMonth(data.filter((d) => d.state_abbrev === 'WA'));

  generateChart(
    document.querySelector('#victoria-chart').getContext('2d'),
    victoriaData,
    `Victorian Recoveries (as at: ${getTimeAtTimezone('Australia/Melbourne')})`,
    '#EE0290'
  );

  generateChart(
    document.querySelector('#western-australia-chart').getContext('2d'),
    westernAustraliaData,
    `Western Australian Recoveries (as at: ${getTimeAtTimezone('Australia/Perth')})`,
    '#EE6002'
  );
}

function generateChart(context, data, title, backgroundColor) {
  new Chart(context, {
    type: 'bar',
    data: {
      labels: getMonthsAsNames([...data.keys()]),
      datasets: [{
        label: 'Total Number of Recoveries',
        data: [...data.values()],
        backgroundColor: backgroundColor,
      }],
    },
    options: {
      legend: false,
      title: {
        display: title != null,
        text: title ? title : '',
        fontSize: 20,
        fontFamily: 'Montserrat',
      },
      scales: {
        yAxes: [{
          scaleLabel: generateAxesLabel('Total Number of Recoveries'),
        }],
        xAxes: [{
          scaleLabel: generateAxesLabel('Month (2020)')
        }]
      },
    },
  });
}

function generateAxesLabel(title) {
  return {
    display: true,
    labelString: title,
    fontSize: 14,
    fontFamily: 'Montserrat',
    fontStyle: 500,
  };
}

function refreshData() {
  d3.csv('../data/COVID_AU_state_daily_change.csv')
    .then((data) => handleData(data))
    .catch((error) => console.log(error));
}

refreshData();

document.querySelector('#refresh-data').addEventListener('click', () => refreshData());
