/**
 * Converts a Map of data grouped by month and sums the recovered data for each month.
 * 
 * @param {Map} data Map of data grouped by month.
 * @returns {Map} Map of data containing months as keys, and total recoveries as values.
 */
function getTotalRecoveredPerMonth(data) {
  return d3.rollup(data, (d) => d3.sum(d, d => d.recovered), (d) => d.date.split('-')[1])
}

/**
 * Converts a list of numbered months to their respective names.
 * The array must contain string digits with each month's number represented by 2 digits.
 * 
 * @param {array} months String Array containing numbered months.
 * @returns An Array containing the names of months.
 */
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

/**
 * Uses the Moment JS library to get the time in a certain timezone.
 * The time is returned in the format 'hh:mm A' (e.g., 09:30 PM).
 * 
 * @param {string} timezone The name of the timezone as a string.
 * @returns Returns the time as a string.
 */
function getTimeAtTimezone(timezone) {
  return moment().tz(timezone).format('hh:mm A')
}

/**
 * Handles the data parsed from CSV by the D3 library.
 * Once the data has been organised, it calls the relevant helper function to draw charts.
 * 
 * @param {object} data The data parsed by D3 Library from the CSV data file.
 */
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

/**
 * Draws a Bar Chart on a given canvas 2D context using the Chart JS Library.
 * 
 * @param {CanvasRenderingContext2D} context The 2D context of the canvas to draw on.
 * @param {Map} data The data to plot as a Map with keys as x-axis labels, and values as y-axis data.
 * @param {*} title The title of the Chart.
 * @param {*} backgroundColor The background color of the bars in the resulting Chart.
 */
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
        fontFamily: 'Montserrat, sans-serif',
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

/**
 * Helper function to generate an object for Chart JS axis label.
 * 
 * @param {string} title The title of the axis as a String.
 * @returns {object} The object for Chart JS axis label.
 */
function generateAxesLabel(title) {
  return {
    display: true,
    labelString: title,
    fontSize: 14,
    fontFamily: 'Montserrat, sans-serif',
    fontStyle: 500,
  };
}

/**
 * The function that initiates reading data and plotting as charts.
 */
function refreshData() {
  d3.csv('../data/COVID_AU_state_daily_change.csv')
    .then((data) => handleData(data))
    .catch((error) => console.log(error));
}

/**
 * Call refreshData function to load data when the page is first loaded.
 */
refreshData();

/**
 * Add click event to allow user to refresh data.
 */
document.querySelector('#refresh-data').addEventListener('click', () => refreshData());
