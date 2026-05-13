"use strict";
class TreeNode {
    left;
    right;
    value;
    constructor(value) {
        this.left = null;
        this.right = null;
        this.value = value;
    }
}
class MinimalBST {
    createMinimalBST(arr) {
        return this.buildMinimalBST(arr, 0, arr.length - 1);
    }
    buildMinimalBST(arr, start, end) {
        if (start > end)
            return null;
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
