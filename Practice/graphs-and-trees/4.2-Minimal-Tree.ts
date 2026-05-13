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
    root: TreeNode | null;

    constructor(){
        this.root = null;
    }

    public insert(value: number){
        const newNode = new TreeNode(value);

        // if tree is empty, create first node and attach to root
        if(this.root === null){
            this.root = newNode;
            return;
        }

        // find the right place for the node
        this.DFSInsert(this.root, value, newNode);
        
    }

    private DFSInsert(node: TreeNode | null, value: number, newNode: TreeNode){
        // base cases
        if(node === null){
            return;
        }

        if(node.value == value){
            console.error('node already exists in tree');
            return;
        }

        
        // recursion - keep going down the tree until empty spot is found
        if(value < node.value){
            if(node.left == null){
                node.left = newNode;
                return;
            }

            this.DFSInsert(node.left, value, newNode);
        } else {
            if(node.right == null){
                node.right = newNode;
                return;
            }

            this.DFSInsert(node.right, value, newNode);
        }
    }

    public printTree(){
        // in-order traversal
        this.DFSPrint(this.root);
    }

    private DFSPrint(node: TreeNode | null){
        // base case
        if(node == null){
            return;
        }

        this.DFSPrint(node.left);
        console.log(node.value, '->');
        this.DFSPrint(node.right);
    }

    public peek(){
        if(this.root === null){
            console.error('tree is empty');
            return;
        }
        console.log('root node is',this.root?.value); 
    }
}

const input = [1,2,3,4,5,6,7,8];
const mid: number = Math.round(input.length / 2);

const minimalBST = new MinimalBST();
minimalBST.peek();

// insert mid
minimalBST.insert(input[mid]);
minimalBST.peek();

// insert remaining elements except mid
for(let i=0; i<input.length; i++){
    if(i == mid) continue;

    minimalBST.insert(input[i]);
}

minimalBST.printTree();
