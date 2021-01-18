removeFirstZeros =(array) =>{
        if(array[0][1] == 0){
            array.shift()
            return removeFirstZeros(array)
        } else {
            return array
        }
        
    }

let testArray = [[1,0],[2,0],[3,10],[4,20],[5,30]]

console.log(removeFirstZeros(testArray))