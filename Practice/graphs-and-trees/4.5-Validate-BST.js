"use strict";
// 4.5 Validate BST
// Implement a function to check if a binary tree is a binary search tree.
// A BST is defined as follows:
// - The left subtree of a node contains only nodes with keys less than the node's key.
// - The right subtree of a node contains only nodes with keys greater than the node's key.
// - Both the left and right subtrees must also be binary search trees.
// ============ EXAMPLE 1 ============
// Input:
//       2
//      / \
//     1   3
//
// Output: true
// ============ EXAMPLE 2 ============
// Input:
//       5
//      / \
//     1   4
//        / \
//       3   6
//
// Output: false
// Explanation: The root node's value is 5 but its right child's value is 4.
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
// approach
/*
DFS through left tree and check if any child is greater than current node, if found return false
DFS through right tree and check if any child is less than current node, if found return false
if both sub trees are true return true
*/
class Solution {
    isValidBST(root) {
        return this.isValidBSTDFS(root);
    }
    isValidBSTDFS(node) {
        // base case
        if (node == null)
            return true;
        if (node.left != null && node.left.val > node.val)
            return false;
        if (node.right != null && node.right.val < node.val)
            return false;
        // recursive case
        return this.isValidBSTDFS(node.left) && this.isValidBSTDFS(node.right);
    }
}
const example1 = new TreeNode(2);
example1.left = new TreeNode(1);
example1.right = new TreeNode(3);
const solution1 = new Solution();
console.log("Example 1 - Expected: true, Got:", solution1.isValidBST(example1));
const example2 = new TreeNode(5);
example2.left = new TreeNode(1);
example2.right = new TreeNode(4);
example2.right.left = new TreeNode(3);
example2.right.right = new TreeNode(6);
const solution2 = new Solution();
console.log("Example 2 - Expected: false, Got:", solution2.isValidBST(example2));
