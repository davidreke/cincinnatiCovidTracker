import axios from "axios";

export const unitedStates = async () => {
  return axios
    .get(
      "https://disease.sh/v3/covid-19/historical/United%20States?lastdays=all"
    )
    .then((res) => {
      let covidArray = Object.entries(res.data.timeline.deaths);

      for (let i = covidArray.length - 1; i > 1; i--) {
        let currentDay = parseInt(covidArray[i][1]);
        let previousDay = parseInt(covidArray[i - 1][1] || 0);
        covidArray[i][1] = currentDay - previousDay;
      }

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
      covidArray = removeFirstZeros(covidArray);
      // console.log(covidArray);
      return covidArray;
    })
    .catch((err) => console.log(err));
};

export const states = async (state) => {
  return axios
    .get(`https://disease.sh/v3/covid-19/nyt/states/${state}?lastdays=all`)
    .then((res) => {
      // console.log(res.data)
      let covidArray = [];
      for (let i = 0; i < res.data.length; i++) {
        let date = new Date(res.data[i].date);
        let currentDay = res.data[i].deaths;
        let previousDay = res.data[i - 1] ? res.data[i - 1].deaths : 0;
        let newDeaths = currentDay - previousDay;

        covidArray.push([date, newDeaths]);
      }

      // calculate seven day average
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

      // remove leading zeros
      covidArray = removeFirstZeros(covidArray);

      return covidArray;
    })
    .catch((err) => console.log(err));
};

export const counties = async (state, county) => {
  return axios
    .get(
      `https://disease.sh/v3/covid-19/historical/usacounties/${state}?lastdays=all`
    )
    .then((res) => {
      //   console.log("response: ", res.data);

      let filteredResponse = res.data.filter((i) => {
        return i.county === county;
      });

      filteredResponse = filteredResponse[0].timeline.deaths;
      filteredResponse = Object.entries(filteredResponse);
      console.log(filteredResponse);

      let covidArray = [];
      for (let i = 0; i < filteredResponse.length; i++) {
        let date = new Date(filteredResponse[i][0]);
        let currentDay = filteredResponse[i][1];
        let previousDay = filteredResponse[i - 1]
          ? filteredResponse[i - 1][1]
          : 0;
        let newDeaths = currentDay - previousDay;
        // console.log(date, newDeaths)
        covidArray.push([date, newDeaths]);
      }

      // calculate seven day average
      for(let j = 0; j < covidArray.length; j++) {
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

      console.log(covidArray);
      // remove leading zeros
      covidArray = removeFirstZeros(covidArray);

      return covidArray;
    })
    .catch((err) => console.log(err));
};

// export const cincyMSA = async () => {
//   return axios
//     .get(
//       `https://disease.sh/v3/covid-19/historical/usacounties/ohio?lastdays=all`
//     )
//     .then((res) => {
//       var hamiltonCounty = res.data.find((i) => i.county === "hamilton").timeline
//         .deaths;
//       var butlerCounty = res.data.find((i) => i.county === "butler").timeline
//         .deaths;
//       var brownCounty = res.data.find((i) => i.county === "brown").timeline
//         .deaths;
//       var clermontCounty = res.data.find((i) => i.county === "clermont").timeline
//         .deaths;
//       var warrenCounty = res.data.find((i) => i.county === "warren").timeline
//         .deaths;

//       console.log("butler county: ", butlerCounty);
//       console.log("hamilton before: ", hamiltonCounty);
//       console.log(butlerCounty["1/1/21"]);
//       for (let i in hamiltonCounty) {
//         hamiltonCounty[i] =
//           hamiltonCounty[i] +
//           butlerCounty[i] +
//           brownCounty[i] +
//           clermontCounty[i] +
//           warrenCounty[i];
//         var finalCovidObject = hamiltonCounty;
//       }
//       console.log("final after ohio: ", finalCovidObject);
//       return axios
//         .get(
//           `https://disease.sh/v3/covid-19/historical/usacounties/kentucky?lastdays=all`
//         )
//         .then((res) => {
//           var booneCounty = res.data.find((i) => i.county === "boone").timeline
//             .deaths;
//           var brackenCounty = res.data.find((i) => i.county === "bracken")
//             .timeline.deaths;
//           var campbellCounty = res.data.find((i) => i.county === "campbell")
//             .timeline.deaths;
//           var gallatinCounty = res.data.find((i) => i.county === "gallatin")
//             .timeline.deaths;
//           var grantCounty = res.data.find((i) => i.county === "grant").timeline
//             .deaths;
//           var kentonCounty = res.data.find((i) => i.county === "kenton").timeline
//             .deaths;
//           var pendletonCounty = res.data.find((i) => i.county === "pendleton")
//             .timeline.deaths;

//           for (let i in finalCovidObject) {
//             // console.log("before addition", finalCovidObject[i], booneCounty[i]);
//             finalCovidObject[i] =
//               finalCovidObject[i] +
//               booneCounty[i] +
//               brackenCounty[i] +
//               campbellCounty[i] +
//               gallatinCounty[i] +
//               grantCounty[i] +
//               kentonCounty[i] +
//               pendletonCounty[i];
            
//           }

          

//           return axios
//             .get(
//               "https://disease.sh/v3/covid-19/historical/usacounties/indiana?lastdays=all"
//             )
//             .then((res) => {
//               var brownCounty = res.data.find((i) => i.county === "brown")
//                 .timeline.deaths;
//               var franklinCounty = res.data.find((i) => i.county === "franklin")
//                 .timeline.deaths;
//               var ohioCounty = res.data.find((i) => i.county === "ohio").timeline
//                 .deaths;

//               for (let i in finalCovidObject) {
//                 finalCovidObject[i] =
//                   finalCovidObject[i] +
//                   brownCounty[i] +
//                   franklinCounty[i] +
//                   ohioCounty[i];
//               }

//               // console.log("final covid array after indina", finalCovidObject);
//               let starterArray = Object.entries(finalCovidObject);

//               let covidArray = [];
//               for (let i = 0; i < starterArray.length; i++) {
//                 let date = new Date(starterArray[i][0]);
//                 let currentDay = starterArray[i][1];
//                 let previousDay = starterArray[i - 1]
//                   ? starterArray[i - 1][1]
//                   : 0;
//                 let newDeaths = currentDay - previousDay;
//                 // console.log(date, newDeaths)
//                 covidArray.push([date, newDeaths]);
//               }

//               for (let j = 0; j < covidArray.length; j++) {
//                 covidArray[j][0] = new Date(covidArray[j][0]);

//                 let one =
//                   covidArray[j - 6] === undefined ? 0 : covidArray[j - 6][1];
//                 let two =
//                   covidArray[j - 5] === undefined ? 0 : covidArray[j - 5][1];
//                 let three = covidArray[j - 4] ? covidArray[j - 4][1] : 0;
//                 let four = covidArray[j - 3] ? covidArray[j - 3][1] : 0;
//                 let five = covidArray[j - 2] ? covidArray[j - 2][1] : 0;
//                 let six = covidArray[j - 1] ? covidArray[j - 1][1] : 0;
//                 let seven = covidArray[j][1];

//                 covidArray[j][2] =
//                   (one + two + three + four + five + six + seven) / 7;
//               }

//               covidArray = removeFirstZeros(covidArray);

//               return covidArray;
//             });
//         })
//         .catch();
//     })
//     .catch();
// };

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

function removeFirstZeros(array) {
  if (array[0][1] === 0) {
    array.shift();
    return removeFirstZeros(array);
  } else {
    return array;
  }
}
