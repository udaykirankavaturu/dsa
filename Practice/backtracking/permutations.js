"use strict";
let nums = [1, 2, 3];
let result = [];
/**
 * result = [[3,1,2], [2,1,3]]
 * 00 [1,2,3]
 * 01  [2,1,3]
 * 02 [3,1,2]
 *
 * undo
 * 02 [2,1,3]
 * 03
 *
 * undo
 * 01 [1,2,3]
 *
 * 02
 */
function backtrack(nums, result, index, next) {
    // base case
    if (index == nums.length) {
        result.push([...nums]);
        return;
    }
    if (next == nums.length)
        return;
    // move
    swap(nums, index, next);
    // recursion
    backtrack(nums, result, index + 1, index + 1);
    // undo
    swap(nums, index, next);
    // recursion with next move
    backtrack(nums, result, index, next + 1);
}
function swap(nums, index, next) {
    if (index == next)
        return;
    let temp = nums[index];
    nums[index] = nums[next];
    nums[next] = temp;
}
backtrack(nums, result, 0, 0);
console.log('permutations', result);
