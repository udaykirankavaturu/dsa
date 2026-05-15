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
  public isBalanced(root: TreeNode | null): boolean {
    const checkFlag = {flag: true};
    this.checkIfTreeIsBalanced(root, checkFlag);
    return checkFlag.flag;
  }

  private checkIfTreeIsBalanced(node: TreeNode | null, checkFlag: {flag: boolean}){
    // base cases
    if(node == null) return;
    if(checkFlag.flag == false) return;
    

    // operation
    let leftGreatGrandChildExists = false;
    let rightGreatGrandChildExists = false;

    // check if great grand children exist in left sub tree
    if(node.left !== null){
        if(node.left.left != null){
            if(node.left.left.left != null || node.left.left.right != null){
                leftGreatGrandChildExists = true;
            }
        }

         if(node.left.right != null){
            if(node.left.right.left != null || node.left.right.right != null){
                leftGreatGrandChildExists = true;
            }
        }
    }

    // check if great grand children exist in left sub tree
    if(node.right !== null){
        if(node.right.left != null){
            if(node.right.left.left != null || node.right.left.right != null){
                leftGreatGrandChildExists = true;
            }
        }

         if(node.right.right != null){
            if(node.right.right.left != null || node.right.right.right != null){
                leftGreatGrandChildExists = true;
            }
        }
    }

    // if great grand children exists on one side but not the other, tree is not balanced, return
    if(leftGreatGrandChildExists != rightGreatGrandChildExists){
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