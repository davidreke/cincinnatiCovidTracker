export const cincyMSA = async () => {
  let ohio = axios
    .get(
      `https://disease.sh/v3/covid-19/historical/usacounties/ohio?lastdays=all`
    )
    .then((res) => {
      var hamiltonCounty = res.data.find((i) => i.county === "hamilton")
        .timeline.cases;
      var butlerCounty = res.data.find((i) => i.county === "butler").timeline
        .cases;
      var brownCounty = res.data.find((i) => i.county === "brown").timeline
        .cases;
      var clermontCounty = res.data.find((i) => i.county === "clermont")
        .timeline.cases;
      var warrenCounty = res.data.find((i) => i.county === "warren").timeline
        .cases;

      for (let i in hamiltonCounty) {
        hamiltonCounty[i] =
          hamiltonCounty[i] +
          butlerCounty[i] +
          brownCounty[i] +
          clermontCounty[i] +
          warrenCounty[i];
        var finalCovidObject = hamiltonCounty;
      }
      return finalCovidObject;
    });

  let kentucky = axios
    .get(
      `https://disease.sh/v3/covid-19/historical/usacounties/kentucky?lastdays=all`
    )
    .then((res) => {
      var booneCounty = res.data.find((i) => i.county === "boone").timeline
        .cases;
      var brackenCounty = res.data.find((i) => i.county === "bracken").timeline
        .cases;
      var campbellCounty = res.data.find((i) => i.county === "campbell")
        .timeline.cases;
      var gallatinCounty = res.data.find((i) => i.county === "gallatin")
        .timeline.cases;
      var grantCounty = res.data.find((i) => i.county === "grant").timeline
        .cases;
      var kentonCounty = res.data.find((i) => i.county === "kenton").timeline
        .cases;
      var pendletonCounty = res.data.find((i) => i.county === "pendleton")
        .timeline.cases;

      for (let i in booneCounty) {
        booneCounty[i] =
          booneCounty[i] +
          booneCounty[i] +
          brackenCounty[i] +
          campbellCounty[i] +
          gallatinCounty[i] +
          grantCounty[i] +
          kentonCounty[i] +
          pendletonCounty[i];
      }

      return booneCounty;
    });

  let indiana = axios
    .get(
      "https://disease.sh/v3/covid-19/historical/usacounties/indiana?lastdays=all"
    )
    .then((res) => {
      let brownCounty = res.data.find((i) => i.county === "brown").timeline
        .cases;
      let franklinCounty = res.data.find((i) => i.county === "franklin")
        .timeline.cases;
      var ohioCounty = res.data.find((i) => i.county === "ohio").timeline.cases;

      for (let i in brownCounty) {
        brownCounty[i] =
          brownCounty[i] + brownCounty[i] + franklinCounty[i] + ohioCounty[i];
      }

      return brownCounty;
    });

  return Promise.all([ohio, kentucky, indiana]).then((res) => {
    //  console.log(res[2])
    let finalCovidObject = {};
    for (let i in res[0]) {
      finalCovidObject[i] = res[0][i] + res[1][i] + res[2][i];
    }

    let starterArray = turnObjectToArray(finalCovidObject);

    let increases = totalsToIncreases(starterArray);

    let zerosRemoved = removeFirstZeros(increases);

    let finalArray = addSevenDayAverage(zerosRemoved);
    return finalArray;
  });
};

function turnObjectToArray(object) {
  return Object.entries(object);
}

function totalsToIncreases(array) {
  let increaseArray = [];
  for (let i = 0; i < array.length; i++) {
    let date = new Date(array[i][0]);
    let currentDay = array[i][1];
    let previousDay = array[i - 1] ? array[i - 1][1] : 0;
    let newCases = currentDay - previousDay;
    // console.log(date, newCases)
    increaseArray.push([date, newCases]);
  }

  return increaseArray;
}

function addSevenDayAverage(covidArray) {
  for (let j = 0; j < covidArray.length; j++) {
    covidArray[j][0] = new Date(covidArray[j][0]);

    let one = covidArray[j - 6] === undefined ? 0 : covidArray[j - 6][1];
    let two = covidArray[j - 5] === undefined ? 0 : covidArray[j - 5][1];
    let three = covidArray[j - 4] ? covidArray[j - 4][1] : 0;
    let four = covidArray[j - 3] ? covidArray[j - 3][1] : 0;
    let five = covidArray[j - 2] ? covidArray[j - 2][1] : 0;
    let six = covidArray[j - 1] ? covidArray[j - 1][1] : 0;
    let seven = covidArray[j][1];

    covidArray[j][2] = (one + two + three + four + five + six + seven) / 7;
  }

  return covidArray;
}
