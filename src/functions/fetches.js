import axios from "axios";

export const unitedStates = async () => {
  return axios
    .get(
      "https://disease.sh/v3/covid-19/historical/United%20States?lastdays=all"
    )
    .then((res) => {
      let covidArray = Object.entries(res.data.timeline.cases);

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
        let currentDay = res.data[i].cases;
        let previousDay = res.data[i - 1] ? res.data[i - 1].cases : 0;
        let newCases = currentDay - previousDay;

        covidArray.push([date, newCases]);
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
        return i.county == county;
      });

      filteredResponse = filteredResponse[0].timeline.cases;
      filteredResponse = Object.entries(filteredResponse);
      console.log(filteredResponse);

      let covidArray = [];
      for (let i = 0; i < filteredResponse.length; i++) {
        let date = new Date(filteredResponse[i][0]);
        let currentDay = filteredResponse[i][1];
        let previousDay = filteredResponse[i - 1]
          ? filteredResponse[i - 1][1]
          : 0;
        let newCases = currentDay - previousDay;
        // console.log(date, newCases)
        covidArray.push([date, newCases]);
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

      console.log(covidArray)
      // remove leading zeros
      covidArray = removeFirstZeros(covidArray);

      return covidArray;
    })
    .catch((err) => console.log(err));
};

export const cincyMSA = async() =>{
  return axios.get(
    `https://disease.sh/v3/covid-19/historical/usacounties/ohio?lastdays=all`
  ).then( res =>{
    var hamiltonCounty = res.data.find(i => i.county == 'hamilton').timeline.cases
    var butlerCounty = res.data.find((i) => i.county == "butler").timeline.cases;
    var brownCounty = res.data.find((i) => i.county == "brown").timeline
      .cases;
    var clermontCounty = res.data.find((i) => i.county == "clermont").timeline
      .cases;
   var warrenCounty = res.data.find((i) => i.county == "warren").timeline.cases;   

   console.log('butler county: ', butlerCounty)
    console.log('hamilton before: ', hamiltonCounty)
    console.log(butlerCounty['1/1/21'])
    for(let i in hamiltonCounty){
      hamiltonCounty[i] = hamiltonCounty[i] + butlerCounty[i] + brownCounty[i] +clermontCounty[i] + warrenCounty[i]
      var finalCovidObject = hamiltonCounty;
    }
    console.log("final after ohio: ", finalCovidObject);
    return axios.get(
      `https://disease.sh/v3/covid-19/historical/usacounties/kentucky?lastdays=all`
    ).then( res =>{
      var booneCounty = res.data.find((i) => i.county == "boone").timeline.cases;
      var brackenCounty = res.data.find((i) => i.county == "bracken").timeline.cases;
      var campbellCounty = res.data.find((i) => i.county == "campbell").timeline
        .cases;
      var gallatinCounty = res.data.find((i) => i.county == "gallatin").timeline
        .cases;
      var grantCounty = res.data.find((i) => i.county == "grant").timeline
        .cases;
      var kentonCounty = res.data.find((i) => i.county == "kenton").timeline
        .cases;
      var pendletonCounty = res.data.find((i) => i.county == "pendleton").timeline
        .cases;  
        
      for (let i in finalCovidObject) {
        console.log("before addition", finalCovidObject[i], booneCounty[i]);
        finalCovidObject[i] =
          finalCovidObject[i] +
          booneCounty[i] +
          brackenCounty[i] +
          campbellCounty[i] +
          gallatinCounty[i] +
          grantCounty[i] +
          kentonCounty[i] +
          pendletonCounty[i];
        console.log("after addition", finalCovidObject[i]);
      }

      console.log("final after kentucky: ", finalCovidObject);

      return axios
        .get(
          "https://disease.sh/v3/covid-19/historical/usacounties/indiana?lastdays=all"
        )
        .then((res) => {
          var brownCounty = res.data.find((i) => i.county == "brown").timeline
            .cases;
          var franklinCounty = res.data.find((i) => i.county == "franklin").timeline
            .cases;
          var ohioCounty = res.data.find((i) => i.county == "ohio").timeline
            .cases;  

          for(let i in finalCovidObject){
            finalCovidObject[i] = finalCovidObject[i]+ brownCounty[i] + franklinCounty[i] + ohioCounty [i]
          }

          console.log('final covid array after indina', finalCovidObject)
          let starterArray = Object.entries(finalCovidObject);

          let covidArray = [];
          for (let i = 0; i < starterArray.length; i++) {
            let date = new Date(starterArray[i][0]);
            let currentDay = starterArray[i][1];
            let previousDay = starterArray[i - 1] ? starterArray[i - 1][1] : 0;
            let newCases = currentDay - previousDay;
            // console.log(date, newCases)
            covidArray.push([date, newCases]);
          }

          for (let j = 0; j < covidArray.length; j++) {
            covidArray[j][0] = new Date(covidArray[j][0]);

            let one =
              covidArray[j - 6] === undefined ? 0 : covidArray[j - 6][1];
            let two =
              covidArray[j - 5] === undefined ? 0 : covidArray[j - 5][1];
            let three = covidArray[j - 4] ? covidArray[j - 4][1] : 0;
            let four = covidArray[j - 3] ? covidArray[j - 3][1] : 0;
            let five = covidArray[j - 2] ? covidArray[j - 2][1] : 0;
            let six = covidArray[j - 1] ? covidArray[j - 1][1] : 0;
            let seven = covidArray[j][1];

            covidArray[j][2] =
              (one + two + three + four + five + six + seven) / 7;
          }

          covidArray = removeFirstZeros(covidArray);

          return covidArray
        }); 
    }
      
     
    ).catch()
    
  }
    
  ).catch();
}

function removeFirstZeros(array) {
  if (array[0][1] == 0) {
    array.shift();
    return removeFirstZeros(array);
  } else {
    return array;
  }
}

