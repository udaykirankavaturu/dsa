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


/*
============= EXAMPLE 3 ==================
      10
     /  \
    5    15
   / \
  3   12

  [3,5,12,10,15] 12 > 10
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

/* FIRST ATTEMPT - WORKING CODE, DOES NOT SOLVE FOR CASES WHERE IMMEDIATE CHILDREN ARE VALID BUT OTHER NODES CAN BE INVALID*/ 
// approach
/*
DFS through left tree and check if any child is greater than current node, if found return false 
DFS through right tree and check if any child is less than current node, if found return false
if both sub trees are true return true
*/

// class Solution {
//   public isValidBST(root: TreeNode | null): boolean {
//     return this.isValidBSTDFS(root);
//   }

//   private isValidBSTDFS(node: TreeNode | null): boolean{
//     // base case
//     if(node == null) return true;

//     if(node.left != null && node.left.val > node.val) return false;
//     if(node.right != null && node.right.val < node.val) return false;

//     // recursive case
//     return this.isValidBSTDFS(node.left) && this.isValidBSTDFS(node.right);
//   }
// }

// // time complexity - O(n) traverse each node if given tree is a BST
// // space complexity - O(1)

/**
 * ATTEMPT TWO - store elements in an array with in-order traversal
 * iterate through array to check if previous value is greater than current value, if yes, return false
 */
class Solution {
  public isValidBST(root: TreeNode | null): boolean {
    // initial check
    if(root == null) return true;

    // build in order list
    let inOrderItems: number[] = [];
    this.buildInOrder(root, inOrderItems);

    // check if list is all ascending
    for (let index = 1; index < inOrderItems.length; index++) {
        const item = inOrderItems[index];
        if(item < inOrderItems[index - 1]){
            return false;
        }
    }

    return true;
    
  }

  private buildInOrder(node: TreeNode | null, inOrderItems: number[]){
    // base case
    if(node == null) return;

    // recursion
    this.buildInOrder(node?.left, inOrderItems);
    inOrderItems.push(node.val);
    this.buildInOrder(node?.right, inOrderItems);
  }
}

/**
 * time complexity - O(n) visit each node
 * space complexity - O(n) for in order array
 */


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