//Question 1: Clean the room function: given an input of [1,2,4,591,392,391,2,5,10,2,1,1,1,20,20],
// make a function that organizes these into individual array that is ordered.
// For example answer(ArrayFromAbove)
// should return: [[1,1,1,1],[2,2,2], 4,5,10,[20,20], 391, 392,591].
// Bonus: Make it so it organizes strings differently from number types.
// i.e. [1, "2", "3", 2] should return [[1,2], ["2", "3"]]

//useful tutorial
//https://www.youtube.com/watch?v=MWD-iKzR2c8&list=PLUp2SeJP6HNB4UmTFyAbvmiVmfi0tpWlH&index=6

let inputArray = [1,2,4,591,392,391,2,5,10,2,1,1,1,20,20];
let cloneOriginalArray = inputArray;

function organizeArray(arr)
{
    return arr.sort();//also sorts alphabetically. sorts numbers first, then capital letters first, then lower case letters
}


function groupSimilarValues(arr,refP,currentStateOfFinalArray,csci)
{
    let startHere = 0;
    let referencePoint = refP;
    let currentState = currentStateOfFinalArray; //when recurssion of the function occurs, the last state is passed to this parameter.
    let tempArray = []; //alwaysEmpty when function starts
    let duplicateArraysCounter = 0;
    let currentStateCurrentIndex = csci;

    for(startHere=0;startHere<arr.length;startHere++)
    {
        
        //console.log(`${arr[referencePoint]} and ${arr[startHere]}`);
        if(arr[referencePoint] === arr[startHere])
        {
            tempArray.push(arr[startHere]);
           if(arr[startHere] != arr[startHere+1])
            {
                console.log(`we are now at the last duplicate of ${arr[startHere]}. next value is ${arr[startHere+1]}`);
            }
            else
            {
                duplicateArraysCounter++;
                
            }
        }

    }

    console.log(`${duplicateArraysCounter} must be removed`);

    if(referencePoint < (arr.length))
    {


        console.log(`before splice: ${currentState}`);
      
        //currentState.splice(currentState.length,0, ...tempArray);//always splices at the end of the array
        if(tempArray.length > 1)
        {
            currentState = currentState.concat([tempArray],undefined);
           
        }
        else
        {
            currentState = currentState.concat(tempArray[0],undefined);
            
        }
        console.log(`after splice: ${currentState}`);
        referencePoint++;

        console.log(`new value of reference point is ${referencePoint}`);
      
        //failed to target the correct spot of currentState to splice (to removed duplicate arrays)
        // currentState.splice(currentStateCurrentIndex,duplicateArraysCounter);
        // console.log(`${duplicateArraysCounter} has been removed starting from index ${currentStateCurrentIndex} of currentState`);
        // currentStateCurrentIndex++;
        groupSimilarValues(arr,referencePoint,currentState,currentStateCurrentIndex);
    }
    else
    {
        currentState = removeUndefinedFromArray(currentState);
        
        
        console.log(currentState);
        return currentState;
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
groupSimilarValues(sortedArray,0,[],0);
