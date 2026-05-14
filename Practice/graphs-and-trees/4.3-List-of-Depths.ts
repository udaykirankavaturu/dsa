// Given a binary tree, design an algorithm which creates a linked list of all the nodes at each depth 
// (e.g., if you have a tree with depth D, you'll have D linked lists).

/*
example input:
             5
            /    \
           3       7
          / \      / \
         2   4 6   8
         |
         1

example output:
5->
3->7
2->4->6->8
1->

*/

// approach
/*
we can use BFS to extract nodes at each level. when we complete a level, use an indicator flag to stop current list and build new list
we can create custom queue that can hold tree node or null, we can use null as indicator for level completion

time complexity - O(n) to visit each node
space complexity - O(h) for maintaining the queue
*/

class TreeNode {
    value: number;
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(value: number){
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class CustomQueueNode {
    value: TreeNode | null;
    next: CustomQueueNode | null;

    constructor(value: TreeNode | null){
        this.value = value;
        this.next = null;
    }
}

class CustomQueue {
    head: CustomQueueNode | null;
    tail: CustomQueueNode | null;

    constructor(){
        this.head = null;
        this.tail = null;
    }

    enqueue(node: TreeNode | null){
        const customQueueNode = new CustomQueueNode(node);

        if(this.head == null && this.tail == null){
            this.head = customQueueNode;
            this.tail = customQueueNode;
        }

        // use tail pointer to add to the back of the queue
        if(this.tail != null){
            this.tail.next = customQueueNode;
            this.tail = customQueueNode.next;
        }
    }

    dequeue(){
        if(this.isEmpty()) return null;

        // extract head node
        const queueNode = this.head;

        // move head pointer ahead
        if(this.head != null){
            this.head = this.head.next;

            // if only node, reset tail pointer
            if(this.head?.next == null){
                this.tail = null;
            }
        }

        return queueNode;
    }

    isEmpty(){
        return this.head === null;
    }
}

class LinkedList {
    node: TreeNode;
    next: TreeNode | null;

    constructor(node: TreeNode){
        this.node = node;
        this.next = null;
    }
}

class LinkedLists{
    linkedLists: LinkedList[];

    constructor(){
        this.linkedLists = [];
    }

    public build(rootNode: TreeNode){
        // empty check
        if(rootNode == null){
            return;
        }

        // create first linked list
        const list = new LinkedList(rootNode);
        this.linkedLists.push(list);


        // only node check
        if(rootNode.left == null || rootNode.right == null){
            return this.linkedLists;
        }

        // create queue
        const queue = new CustomQueue();
        queue.enqueue(rootNode);
        let current = this.linkedLists.length - 1; // to know where to add the nodes

        while(queue.isEmpty() != false){
            const queueNode = queue.dequeue();

            if(queueNode == null){
                const list = new LinkedList(rootNode);
                this.linkedLists.push(list);
                current++;
                continue;
            }
            
            this.linkedLists[current].next = queueNode.value;

            if(queueNode?.value?.left != null){
                queue.enqueue(queueNode.value.left);
            }

            if(queueNode?.value?.right != null){
                queue.enqueue(queueNode.value.right);
            }
        }

    }
}

const node = new TreeNode(5);
const lists = new LinkedLists().build(node);


