/**
 * 4.9 BST Sequences
 * A binary search tree was created by traversing through an array from left to right and inserting each element.
 * Given a binary search tree with distinct elements, print all possible arrays that could have led to this tree.
 */

// ============ EXAMPLE 1 ============
// Input:
//      2
//     / \
//    1   3
//
// Output: [[2,1,3], [2,3,1]]
// Explanation:
// - 2 must always come first (it's the root)
// - 1 and 3 are both children of root, so either can come next

/**
 * 
 
// ============ EXAMPLE 2 ============
// Input:
//      5
//     / \
//    1   4
//       / \
//      3   6
//
      from 5's point of view
      get all arrays so i can just prepend myself
// 

// 
// Output: [
//   [5,1,4,3,6], [5,1,4,6,3],
//   [5,4,1,3,6], [5,4,1,6,3],
//   [5,4,3,1,6], [5,4,3,6,1],
//   [5,4,6,1,3], [5,4,6,3,1]
// ]
// Explanation:
// - 5 must always come first (root)
// - 1 and 4 are both available next (children of root)
// - 3 and 6 can only appear after 4 is inserted
// - 1 is independent of 4's subtree, so it can appear anywhere after 5
*/


class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val: number) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class Solution {
  public bstSequences(root: TreeNode | null): number[][] {
    if(root == null) return [];

    let result: number[][] = [];
    let pool: number[] = [];
    pool.push(root?.val);
    this.backtrack(root, result, pool);

    return result;
  }

  private backtrack(node: TreeNode | null, result: number[][], pool: number[]){
    // base case
    if(node == null) {
      return;
    };

    

  }
}

// Example 1
const root1 = new TreeNode(2);
root1.left = new TreeNode(1);
root1.right = new TreeNode(3);

const solution1 = new Solution();
console.log("Example 1:");
console.log("Expected: [[2,1,3],[2,3,1]]");
console.log("Got:", solution1.bstSequences(root1));

// Example 2
const root2 = new TreeNode(5);
root2.left = new TreeNode(1);
root2.right = new TreeNode(4);
root2.right.left = new TreeNode(3);
root2.right.right = new TreeNode(6);

const solution2 = new Solution();
console.log("\nExample 2:");
console.log("Expected: [[5,1,4,3,6],[5,1,4,6,3],[5,4,1,3,6],[5,4,1,6,3],[5,4,3,1,6],[5,4,3,6,1],[5,4,6,1,3],[5,4,6,3,1]]");
console.log("Got:", solution2.bstSequences(root2));