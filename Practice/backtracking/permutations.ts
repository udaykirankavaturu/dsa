let nums: number[] = [1,2,3]
let result: number[][] = [];

function backtrack(nums: number[], result: number[][], index: number, next: number){
    // base case
    if(index == nums.length){
        result.push([...nums]);
        return;
    }

    if(next == nums.length) return;

    // move
    swap(nums, index, next);

    // recursion
    backtrack(nums, result, index+1, index+1);

    // undo
    swap(nums, index, next);

    // recursion with next move
    backtrack(nums, result, index, next+1);
}

function swap(nums: number[], index: number, next: number){
    if(index == next) return;

    let temp = nums[index];
    nums[index] = nums[next];
    nums[next] = temp;
}

backtrack(nums, result, 0, 0);

console.log('permutations',result);