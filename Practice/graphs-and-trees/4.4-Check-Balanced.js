"use strict";
// Implement a function to check if a binary tree is balanced. 
// For the purposes of this questions, a balanced tree is defined to be a tree such that the heights of the two subtrees of any node never differ by more than one.
// ============ EXAMPLE 1 ============
// Input:
//         3
//       /   \
//      9    20
//          /  \
//         15   7
//
// Output: true
// ============ EXAMPLE 2 ============
// Input:
//         1
//       /   \
//      2     2
//     /
//    3
//   /
//  4
//
// Output: false
// approach 
// from current node, check great grand children 
// if great grand child exists on one side, other side must have at least one great grand child
// time complexity - O(n) worst case may visit all nodes
// space complexity - O(1)
class TreeNode {
    val;
    left;
    right;
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}
class Solution {
    isBalanced(root) {
        const checkFlag = { flag: true };
        this.checkIfTreeIsBalanced(root, checkFlag);
        return checkFlag.flag;
    }
    checkIfTreeIsBalanced(node, checkFlag) {
        // base cases
        if (node == null)
            return;
        if (checkFlag.flag == false)
            return;
        // operation
        let leftGreatGrandChildExists = false;
        let rightGreatGrandChildExists = false;
        if (node.left !== null) {
            if (node.left.left != null) {
                if (node.left.left.left != null || node.left.left.right != null) {
                    leftGreatGrandChildExists = true;
                }
            }
            if (node.left.right != null) {
                if (node.left.right.left != null || node.left.right.right != null) {
                    leftGreatGrandChildExists = true;
                }
            }
        }
        if (node.right !== null) {
            if (node.right.left != null) {
                if (node.right.left.left != null || node.right.left.right != null) {
                    leftGreatGrandChildExists = true;
                }
            }
            if (node.right.right != null) {
                if (node.right.right.left != null || node.right.right.right != null) {
                    leftGreatGrandChildExists = true;
                }
            }
        }
        if (leftGreatGrandChildExists != rightGreatGrandChildExists) {
            checkFlag.flag = false;
            return;
        }
        // recursion
        this.checkIfTreeIsBalanced(node.left, checkFlag);
        this.checkIfTreeIsBalanced(node.right, checkFlag);
    }
}
const example1 = new TreeNode(3);
example1.left = new TreeNode(9);
example1.right = new TreeNode(20);
example1.right.left = new TreeNode(15);
example1.right.right = new TreeNode(7);
const solution1 = new Solution();
console.log("Example 1 - Expected: true, Got:", solution1.isBalanced(example1));
const example2 = new TreeNode(1);
example2.left = new TreeNode(2);
example2.right = new TreeNode(2);
example2.left.left = new TreeNode(3);
example2.left.left.left = new TreeNode(4);
const solution2 = new Solution();
console.log("Example 2 - Expected: false, Got:", solution2.isBalanced(example2));
