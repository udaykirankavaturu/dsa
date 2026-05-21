/**
 * 4.8 First Common Ancestor
 * Design an algorithm and write code to find the first common ancestor of two nodes in a binary tree.
 * Avoid storing additional nodes in a data structure. NOTE: This is not necessarily a binary search tree.
 */

// ============ EXAMPLE 1 ============
// Input: find first common ancestor of nodes 4 and 5
//
//           3
//          / \
//         5   1
//        / \ / \
//       6  2 0  8
//         / \
//        7   4
//
// Output: 5
// Explanation: The first common ancestor of nodes 4 and 5 is 5 itself.

// ============ EXAMPLE 2 ============
// Input: find first common ancestor of nodes 4 and 1
//
//           3
//          / \
//         5   1
//        / \ / \
//       6  2 0  8
//         / \
//        7   4
//
// Output: 3
// Explanation: The first common ancestor of nodes 4 and 1 is 3.


/**
 * approach
 * 
 * test cases
 * if tree is empty return null
 * if tree has only one node and given node is same node, return root node
 * if node1 or node2 don't exist in the tree, return null
 * 
 * main cases
 * if node1 is in left subtree and node2 is in right subtree, return parent node
 * if node1 and node2 are in same subtree, return highest node
 * 
 * 
 * DFS to check if node1, node2 are valid, can mark where they are found left or right
 * if both are on same side, go down that path and return the first node that is found
 * if both are on different side, return root node
 * 
 * time complexity - O(n) to visit each node (max conceivable runtime)
 * space complexity - O(1)
 * 
 * 
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
  public firstCommonAncestor(root: TreeNode | null, p: TreeNode, q: TreeNode): TreeNode | null {
    // null check
    if(root == null || p == null || q == null) return null;

    // if either p or q is root, return root
    if(root.val == p.val || root.val == q.val) return root;

    // find p and q in tree
    // -1 -> not found, 1 -> left subtree, 2 -> right subtree
    let pqLocation = {
        p: -1,
        q: -1
    }

    // go down left subtree and right subtree
    this.DFS(root.left, p, q, pqLocation, true);
    this.DFS(root.right, p, q, pqLocation, false);

    // check if either p or q is not found
    if(pqLocation.p == -1 || pqLocation.q == -1) return null;

    // if both are in different subtrees return root node
    if(pqLocation.p != pqLocation.q) return root;

    // both are in same subtree, find the nearest one from root and return
    if(pqLocation.p == 1){
        // go left
        return this.getNearestNode(root.left, p, q);
    } else {
        // go right
        return this.getNearestNode(root.right, p, q);
    }
  }

  private DFS(node: TreeNode | null, p: TreeNode, q: TreeNode, pqLocation : {p: number, q: number}, searchingLeft: boolean){
    // base case
    if(node == null) return;

    // operation
    if(node.val == p.val){
        pqLocation.p = searchingLeft ? 1 : 2;
    }

    if(node.val == q.val){
        pqLocation.q = searchingLeft ? 1 : 2;
    }

    // recursion
    this.DFS(node.left, p,q,pqLocation, searchingLeft);
    this.DFS(node.right, p,q,pqLocation, searchingLeft);
  }

  private getNearestNode(node: TreeNode | null, p: TreeNode, q: TreeNode): TreeNode | null{
    // base case
    if(node == null) return null;

    // operation
    if(node.val == p.val) return p;
    if(node.val == q.val) return q;

    // recursion
    return this.getNearestNode(node.left, p, q) ?? this.getNearestNode(node.right, p, q);
  }
}

const root = new TreeNode(3);
root.left = new TreeNode(5);
root.right = new TreeNode(1);
root.left.left = new TreeNode(6);
root.left.right = new TreeNode(2);
root.right.left = new TreeNode(0);
root.right.right = new TreeNode(8);
root.left.right.left = new TreeNode(7);
root.left.right.right = new TreeNode(4);

const p1 = root.left;                  // node 5
const q1 = root.left.right.right;      // node 4

const solution1 = new Solution();
const result1 = solution1.firstCommonAncestor(root, p1, q1);
console.log("Example 1 - Expected: 5, Got:", result1?.val);

const p2 = root.left.right.right;      // node 4
const q2 = root.right;                 // node 1

const solution2 = new Solution();
const result2 = solution2.firstCommonAncestor(root, p2, q2);
console.log("Example 2 - Expected: 3, Got:", result2?.val);