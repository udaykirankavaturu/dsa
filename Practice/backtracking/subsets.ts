let nums = [1,2,3]
let result: number[][] = [];
let path: number[] = [];

function backtrack(nums: number[], result: number[][], path: number[], index: number){
    // base case
    if(index >= nums.length){
        result.push([...path]);
        return;
    }

    // move
    path.push(nums[index]);

    // recursion
    backtrack(nums, result, path, index+1);

    // undo move
    path.pop();

    // recursion with next move
    backtrack(nums, result, path, index+1);
}

backtrack(nums, result, path, 0);
console.log('subsets',result);

