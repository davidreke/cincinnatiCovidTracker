import axios from 'axios'

export const unitedStates = async() =>{
    return axios.get('https://disease.sh/v3/covid-19/historical/United%20States?lastdays=all').then( res => {
        let covidArray = Object.entries(res.data.timeline.cases);
        
        for(let i = covidArray.length - 1; i > 1; i--){
            let currentDay =parseInt(covidArray[i][1])
            let previousDay =parseInt((covidArray[(i-1)][1]) || 0)
            covidArray[i][1] = currentDay - previousDay
        }

                for(let j = 0; j <covidArray.length; j++){
            covidArray[j][0] = new Date(covidArray[j][0])

            let one = covidArray[j-6]  === undefined? 0 :covidArray[j-6][1];
            let two = covidArray[j-5] === undefined? 0 :covidArray[j-5][1];
            let three = covidArray[j-4]? covidArray[j-4][1] :0;
            let four = covidArray[j-3]? covidArray[j-3][1] : 0;
            let five = covidArray[j-2]? covidArray[j-2][1] : 0;
            let six = covidArray[j-1]? covidArray[j-1][1] : 0;
            let seven = covidArray[j][1];

            covidArray[j][2] =(one + two + three + four + five + six + seven )/7
        }
        covidArray = removeFirstZeros(covidArray)
        // console.log(covidArray);
        return covidArray;
    }

    ).catch(err => console.log(err))
}

export const states = async(state) =>{
    return axios.get(`https://disease.sh/v3/covid-19/nyt/states/${state}?lastdays=all`).then(res =>{
        // console.log(res.data)
        let covidArray = []
        for(let i =0; i < res.data.length; i++){
            let date = new Date(res.data[i].date)
            let currentDay = res.data[i].cases;
            let previousDay = res.data[i-1]? res.data[i-1].cases : 0
            let newCases = currentDay - previousDay;

            covidArray.push([date, newCases])
        }

        // calculate seven day average
        for(let j = 0; j <covidArray.length; j++){
            covidArray[j][0] = new Date(covidArray[j][0])

            let one = covidArray[j-6]  === undefined? 0 :covidArray[j-6][1];
            let two = covidArray[j-5] === undefined? 0 :covidArray[j-5][1];
            let three = covidArray[j-4]? covidArray[j-4][1] :0;
            let four = covidArray[j-3]? covidArray[j-3][1] : 0;
            let five = covidArray[j-2]? covidArray[j-2][1] : 0;
            let six = covidArray[j-1]? covidArray[j-1][1] : 0;
            let seven = covidArray[j][1];

            covidArray[j][2] =(one + two + three + four + five + six + seven )/7
        }

            // remove leading zeros
            covidArray = removeFirstZeros(covidArray)

            return covidArray

    }).catch(err => console.log(err))
}

export const counties= async(state, county) =>{
return axios.get(`https://disease.sh/v3/covid-19/historical/usacounties/${state}?lastdays=all`).then(res =>{
        console.log('response: ',res.data)        

        let filteredResponse = res.data.filter(i => {return i.county == county})

        filteredResponse =filteredResponse[0].timeline.cases
        filteredResponse = Object.entries(filteredResponse)
        console.log(filteredResponse)


        let covidArray = []
        for(let i =0; i < filteredResponse.length; i++){
            let date = new Date(filteredResponse[i][0])
            let currentDay = filteredResponse[i][1];
            let previousDay = filteredResponse[i-1]? filteredResponse[i-1][1] : 0
            let newCases = currentDay - previousDay;
            // console.log(date, newCases)
            covidArray.push([date, newCases])
        }

        // calculate seven day average
        for(let j = 0; j <covidArray.length; j++){
            covidArray[j][0] = new Date(covidArray[j][0])

            let one = covidArray[j-6]  === undefined? 0 :covidArray[j-6][1];
            let two = covidArray[j-5] === undefined? 0 :covidArray[j-5][1];
            let three = covidArray[j-4]? covidArray[j-4][1] :0;
            let four = covidArray[j-3]? covidArray[j-3][1] : 0;
            let five = covidArray[j-2]? covidArray[j-2][1] : 0;
            let six = covidArray[j-1]? covidArray[j-1][1] : 0;
            let seven = covidArray[j][1];

            covidArray[j][2] =(one + two + three + four + five + six + seven )/7
        }

        // console.log(covidArray)
            // remove leading zeros
            covidArray = removeFirstZeros(covidArray)

            return covidArray

    }).catch(err => console.log(err))
}

function removeFirstZeros(array){
        if (array[0][1] == 0){
            array.shift()
            return this.removeFirstZeros(array)
        } else {
            return array
        }
        
    }