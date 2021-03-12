//Question 1: Clean the room function: given an input of [1,2,4,591,392,391,2,5,10,2,1,1,1,20,20],
// make a function that organizes these into individual array that is ordered.
// For example answer(ArrayFromAbove)
// should return: [[1,1,1,1],[2,2,2], 4,5,10,[20,20], 391, 392,591].
// Bonus: Make it so it organizes strings differently from number types.
// i.e. [1, "2", "3", 2] should return [[1,2], ["2", "3"]]

//useful tutorial.
//https://www.youtube.com/watch?v=MWD-iKzR2c8&list=PLUp2SeJP6HNB4UmTFyAbvmiVmfi0tpWlH&index=6

let inputArray = [1,2,4,591,392,391,2,5,10,2,1,1,1,20,20];
let cloneOriginalArray = inputArray;

function organizeArray(arr)
{
    return arr.sort(comparer);//also sorts alphabetically. sorts numbers first, then capital letters first, then lower case letters
}

function comparer(a,b)
{
    return a-b;
}

function groupSimilarValues(arr,refP,currentStateOfFinalArray)
{       


        let referencePoint = refP;//to be used as an index of arr. arr[referencePoint] indicates which part of the inputed array we are currently processing.
                                //referencePoint gets incremented near the end of the function and the function is called again within itself, while passing the new value of refP.
                                //Thus letting us redo the same process on the next index of arr.
        let currentState = currentStateOfFinalArray; //when recurssion of the function occurs, the last state is passed to this parameter.
        let tempArray = []; //alwaysEmpty when function starts. This array will contain any values that are similar to arr[refP]. If tempArray.length > 1, it will then be inserted inside currentState turning currentState into an nested array.
 

        if(currentState.length > 1)
        {
            let finalValue = [];//the value to be returned
        }  

        for(let startHere=0;startHere<arr.length;startHere++)
        {
            
            //console.log(`${arr[referencePoint]} and ${arr[startHere]}`);
            if(arr[referencePoint] === arr[startHere])
            {
                tempArray.push(arr[startHere]);
        
            }
        }

        if(referencePoint < (arr.length))
        {

            console.log(`before splice: ${currentState}`);
            if(tempArray.length > 1)
            {
                //WHY NOT PUT AN IF STATEMENT BEFORE CONCATINATING?
                //I did not use if(arr[refP+1] != currentState[currentState.length-2][0]) on the line before
                //currentState = currentState.concat([tempArray],undefined);
                //because currentState starts-off as [] thus causing an error of 0 is undefined

                                                                            //WHY I AM CONCATINATING undefined.
                currentState = currentState.concat([tempArray],undefined);//I tried splice and push but they don't nest tempArray inside currentState.
                                                                          //They just insert the values from tempArray to currentState.
                                                                        //so far, this is the only method that allows me to insert tempArray as an array.


                console.log(`if ${arr[refP+1]} ==== ${currentState[currentState.length-2][0]}`);
                console.log(`splice 2 items from ${currentState[currentState.length-2]}`);
                if(arr[refP+1] === currentState[currentState.length-2][0])//remove array that is a duplicate of the last
                {
                    currentState.splice(currentState.length-2,2);
                }
                
            }
            else
            {
                currentState = currentState.concat(tempArray[0],undefined);
                
            }
            console.log(`after splice: ${currentState}`);
            referencePoint++;

            console.log(`new value of reference point is ${referencePoint}`);
            groupSimilarValues(arr,referencePoint,currentState);
            return finalValue;
        }
        else
        {
            currentState = removeUndefinedFromArray(currentState);
            finalValue = currentState;
        }
       
}



function removeUndefinedFromArray(arrayWithUndefineds)
{
    let filtered = arrayWithUndefineds.filter(function (el) {
        return el != null;
      });
      
      return filtered;
}

let sortedArray =  organizeArray(inputArray);
console.log(sortedArray);

let groupedArray = groupSimilarValues(sortedArray,0,[]);
console.log(groupedArray);
