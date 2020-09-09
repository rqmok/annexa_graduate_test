# Annexa Graduate Test

## Data
The data is contained in `data/COVID_AU_state_daily_change.csv`, which was provided by Annexa. The data contains daily changes in COVID case figures in Australia.

## Libraries
This project uses four different libraries to complete this task efficiently and with a small amount of code. The four libraries used are:

* Chart.js
* D3
* Moment.js
* Moment-Timezone.js (with data)

The D3 library helps to read and filter data, the Chart.js library, while the Moment.js and Moment-Timezone.js is used to retrieve the time based on a given timezone.

## Assets
* `images/refresh-18dp.svg` from `material.io`

## How it works
The following are the steps that the program (main.js) takes to complete the task:

1. Retrieve data from `data/COVID_AU_state_daily_change.csv` using `D3`.
2. Filter and separate data into Victoria and Western Australia.
3. Use `D3` to group each set of data by month and sum all recovered numbers for each month respectively.
4. Calculate the times in Perth (Western Australia) and Melbourne (Victoria) using `Moment.js` and `Moment-Timezone.js`.
5. Pass the calculated times and the summed data for each month to a helper function that generates the charts using `Chart.js`.

## How to Run
In order to run the program, it is important to setup a server. The `index.html` file needs to be opened, but opening it in the latest browsers will not work. This is due to the fact that browsers have a very strict `CORS` policy which doesn't allow the `index.html` file to load any other files that it needs.

### Ways to bypass CORS

#### Disable CORS in browser
The easiest way to run `index.html` with all its dependencies is to disable the CORS feature in the browser.

#### Setup Server
Another way to run `index.html` is to setup a temporary server. The easiest way to do this is to use an extension in your preferred IDE that can quickly setup a temparary server.

For example, Visual Studio Code has an extension called `Live Server` that can do this. Simply install this extension, right-click on `index.html` and select `Open with Live Server`.

An alternative way to run a server is to use the `serve` package with `node.js`. For example, this can be quickly done with the command `npx serve -p 5000 .` in the project directory, which will show the project at `localhost:5000`.