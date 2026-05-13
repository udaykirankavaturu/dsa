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
    root;
    constructor() {
        this.root = null;
    }
    insert(value) {
        const newNode = new TreeNode(value);
        // if tree is empty, create first node and attach to root
        if (this.root === null) {
            this.root = newNode;
            return;
        }
        // find the right place for the node
        this.DFSInsert(this.root, value, newNode);
    }
    DFSInsert(node, value, newNode) {
        // base cases
        if (node === null) {
            return;
        }
        if (node.value == value) {
            console.error('node already exists in tree');
            return;
        }
        // recursion - keep going down the tree until empty spot is found
        if (value < node.value) {
            if (node.left == null) {
                node.left = newNode;
                return;
            }
            this.DFSInsert(node.left, value, newNode);
        }
        else {
            if (node.right == null) {
                node.right = newNode;
                return;
            }
            this.DFSInsert(node.right, value, newNode);
        }
    }
    printTree() {
        // in-order traversal
        this.DFSPrint(this.root);
    }
    DFSPrint(node) {
        // base case
        if (node == null) {
            return;
        }
        this.DFSPrint(node.left);
        console.log(node.value, '->');
        this.DFSPrint(node.right);
    }
    peek() {
        if (this.root === null) {
            console.error('tree is empty');
            return;
        }
        console.log('root node is', this.root?.value);
    }
}
const input = [1, 2, 3, 4, 5, 6, 7, 8];
const mid = Math.round(input.length / 2);
const minimalBST = new MinimalBST();
minimalBST.peek();
// insert mid
minimalBST.insert(input[mid]);
minimalBST.peek();
// insert remaining elements except mid
for (let i = 0; i < input.length; i++) {
    if (i == mid)
        continue;
    minimalBST.insert(input[i]);
}
minimalBST.printTree();
