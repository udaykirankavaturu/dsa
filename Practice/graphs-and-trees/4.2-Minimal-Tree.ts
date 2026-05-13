class TreeNode {
    left: TreeNode | null;
    right: TreeNode | null;
    value: number;

    constructor(value: number){
        this.left = null;
        this.right = null;
        this.value = value;
    }
}

class MinimalBST {
  public createMinimalBST(arr: number[]): TreeNode | null {
    return this.buildMinimalBST(arr, 0, arr.length - 1);
  }

  private buildMinimalBST(arr: number[], start: number, end: number): TreeNode | null {
    if (start > end) return null;
    
    const mid = Math.floor((start + end) / 2);
    const root = new TreeNode(arr[mid]);
    
    root.left = this.buildMinimalBST(arr, start, mid - 1);
    root.right = this.buildMinimalBST(arr, mid + 1, end);
    
    return root;
  }
}

// Usage:
const input = [1, 2, 3, 4, 5, 6, 7, 8];
const bst = new MinimalBST();
const root = bst.createMinimalBST(input);
