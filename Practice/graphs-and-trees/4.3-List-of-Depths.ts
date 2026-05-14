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


/* WRONG OVERCOMPLICATED
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
            } else if(queueNode?.value?.right != null){
                queue.enqueue(queueNode.value.right);
            } else {
                queue.enqueue(null);
            }


        }

    }
}

const node = new TreeNode(5);
const lists = new LinkedLists().build(node);
*/


// CORRECT

// Given a binary tree, design an algorithm which creates a linked list of all the nodes at each depth
// (e.g., if you have a tree with depth D, you'll have D linked lists).

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

class LinkedListNode {
  val: number;
  next: LinkedListNode | null;

  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

class Solution {
  public createLevelLinkedLists(
    root: TreeNode | null
  ): LinkedListNode[][] {
    if (!root) return [];

    const result: LinkedListNode[][] = [];
    const queue: TreeNode[] = [root];

    while (queue.length > 0) {
      const levelSize = queue.length; // Key: know how many nodes in this level
      const currentLevelList: LinkedListNode[] = [];

      // Process exactly levelSize nodes (one level)
      for (let i = 0; i < levelSize; i++) {
        const node = queue.shift()!;
        const listNode = new LinkedListNode(node.val);
        currentLevelList.push(listNode);

        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }

      // Convert array to linked list for this level
      const levelLinkedList = this.arrayToLinkedList(currentLevelList);
      result.push(levelLinkedList);
    }

    return result;
  }

  // Helper: convert array of nodes to linked list
  private arrayToLinkedList(nodes: LinkedListNode[]): LinkedListNode[] {
    for (let i = 0; i < nodes.length - 1; i++) {
      nodes[i].next = nodes[i + 1];
    }
    return nodes;
  }
}

// ============ TEST CASES ============

// Build test tree:
//              5
//            /    \
//           3       7
//          / \      / \
//         2   4    6   8
//         |
//         1

const root = new TreeNode(5);
root.left = new TreeNode(3);
root.right = new TreeNode(7);
root.left.left = new TreeNode(2);
root.left.right = new TreeNode(4);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(8);
root.left.left.left = new TreeNode(1);

const solution = new Solution();
const result = solution.createLevelLinkedLists(root);

// Expected output:
// Level 0: 5->
// Level 1: 3->7->
// Level 2: 2->4->6->8->
// Level 3: 1->

// ============ COMPLEXITY ANALYSIS ============
/*
Time Complexity: O(n)
  - We visit each node exactly once in the BFS traversal
  - n = total number of nodes in the tree

Space Complexity: O(w)
  - w = maximum width of the tree (max nodes at any level)
  - Queue stores at most w nodes at a time
  - In a complete binary tree, w = n/2 (worst case)
  - In a skewed tree, w = 1 (best case)
  - Result array stores all n nodes total = O(n) space

Total: O(n) time, O(w) space
*/

// ============ ALGORITHM EXPLANATION ============
/*
Approach: Level-Order Traversal (BFS)

1. Start with root in queue
2. For each level:
   - Get the current queue size (this tells us how many nodes are at this level)
   - Dequeue exactly that many nodes
   - Create LinkedListNodes from these TreeNodes
   - Enqueue all children (for next level)
3. Convert each level's nodes array to a linked list

Why this works:
- BFS naturally processes level by level
- By tracking queue.length at start of iteration, we know exact level size
- No need for null separators or complex logic
- Simple and efficient

Edge cases handled:
- Empty tree (null root) → return empty array
- Single node → return array with one linked list
- Unbalanced trees → still works correctly
- Single child nodes → still processes all levels
*/

