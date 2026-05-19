/**
 * 4.6 Successor
 * Write an algorithm to find the 'next' node (i.e., in-order successor) of a given node in a BST.
 * You may assume that each node has a link to its parent.
 */

// ============ EXAMPLE 1 ============
// Input: find successor of node 2
//
//         5
//        / \
//       3   6
//      / \
//     2   4
//    /
//   1
//
// Output: 3
// Explanation: In-order traversal is [1,2,3,4,5,6], next node after 2 is 3

// ============ EXAMPLE 2 ============
// Input: find successor of node 6 (rightmost node, no successor)
//
//         5
//        / \
//       3   6
//      / \
//     2   4
//    /
//   1
//
// Output: null
// Explanation: In-order traversal is [1,2,3,4,5,6], node 6 has no successor

/**
 * approach 1 - build an in order traversal list, find next element of given node and return. if no node, return null.
 * time complexity - O(n)
 * space complexity - O(n)
 */

/**
 * approach 2 - use the parent
 * successor can be on the right child or on the parent (if current is left child)
 * find node in tree, once found, check if right child exists, if yes return right child, otherwise, check if parent is greater than current node.
 * if yes, return parent, otherwise return null
 * 
 * time complexity - O(n) for finding node
 * space complexity - O(1)
 */

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  parent: TreeNode | null;

  constructor(val: number) {
    this.val = val;
    this.left = null;
    this.right = null;
    this.parent = null;
  }
}

class Solution {
  public inorderSuccessor(node: TreeNode | null): TreeNode | null {
    if(node == null) return null;

    if(node.right != null) return this.getSuccessorChild(node.right);

    if(node.parent != null && node.parent.val > node.val) return this.getSuccessorParent(node.parent, node);

    return null;
  }

  private getSuccessorChild(node: TreeNode | null): TreeNode | null {
    // base case
    if(node == null) return null;

    // operation
    if(node.left == null) return node;

    // recursion
    return this.getSuccessorChild(node.left);
  }

  private getSuccessorParent(node: TreeNode | null, currentNode: TreeNode): TreeNode | null {
    // base case 
    if(node == null) return null;

    // operation
    if(node.val > currentNode.val) return node;

    // recursion
    return this.getSuccessorParent(node.parent, currentNode);
  }
}



const root1 = new TreeNode(5);
const n3 = new TreeNode(3);
const n6 = new TreeNode(6);
const n2 = new TreeNode(2);
const n4 = new TreeNode(4);
const n1 = new TreeNode(1);

root1.left = n3;       n3.parent = root1;
root1.right = n6;      n6.parent = root1;
n3.left = n2;          n2.parent = n3;
n3.right = n4;         n4.parent = n3;
n2.left = n1;          n1.parent = n2;

const solution1 = new Solution();
const result1 = solution1.inorderSuccessor(n2);
console.log("Example 1 - Expected: 3, Got:", result1?.val);



const solution2 = new Solution();
const result2 = solution2.inorderSuccessor(n6);
console.log("Example 2 - Expected: null, Got:", result2?.val ?? null);