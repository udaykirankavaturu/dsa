// Given a binary tree, design an algorithm which creates a linked list of all the nodes at each depth
// Approach: Custom Queue with null sentinel to mark level boundaries

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

// Custom Queue Node for holding TreeNode or null (null = level boundary marker)
class QueueNode {
  value: TreeNode | null;
  next: QueueNode | null;

  constructor(value: TreeNode | null) {
    this.value = value;
    this.next = null;
  }
}

class CustomQueue {
  head: QueueNode | null;
  tail: QueueNode | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  enqueue(node: TreeNode | null): void {
    const queueNode = new QueueNode(node);

    // If queue is empty, set both head and tail
    if (this.head === null && this.tail === null) {
      this.head = queueNode;
      this.tail = queueNode;
      return;
    }

    // Add to the back using tail pointer
    if (this.tail !== null) {
      this.tail.next = queueNode;
      this.tail = queueNode;
    }
  }

  dequeue(): TreeNode | null {
    if (this.isEmpty()) return undefined as any;

    // Extract value from head
    const value = this.head!.value;

    // Move head pointer to next
    this.head = this.head!.next;

    // If queue becomes empty, reset tail
    if (this.head === null) {
      this.tail = null;
    }

    return value;
  }

  isEmpty(): boolean {
    return this.head === null;
  }

  size(): number {
    let count = 0;
    let current = this.head;
    while (current !== null) {
      count++;
      current = current.next;
    }
    return count;
  }
}

class LinkedLists {
  private linkedLists: LinkedListNode[][] = [];

  public build(rootNode: TreeNode | null): LinkedListNode[][] {
    // Empty check
    if (rootNode === null) {
      return [];
    }

    const queue = new CustomQueue();
    queue.enqueue(rootNode);
    queue.enqueue(null); // null marker = end of level 0

    while (!queue.isEmpty()) {
      const currentLevel: LinkedListNode[] = [];

      // Process all nodes at current level (until we hit null)
      let node = queue.dequeue();
      while (node !== null) {
        // Add this node to current level
        const listNode = new LinkedListNode(node.val);
        currentLevel.push(listNode);

        // Enqueue children for next level
        if (node.left !== null) {
          queue.enqueue(node.left);
        }
        if (node.right !== null) {
          queue.enqueue(node.right);
        }

        // Move to next node in current level
        node = queue.dequeue();
      }

      // If current level has nodes, add the linked list to result
      if (currentLevel.length > 0) {
        // Convert array to linked list for this level
        const levelHead = this.arrayToLinkedList(currentLevel);
        this.linkedLists.push(levelHead);

        // If queue is not empty, add null marker for next level
        if (!queue.isEmpty()) {
          queue.enqueue(null);
        }
      }
    }

    return this.linkedLists;
  }

  // Helper: Convert array of nodes to linked list (returns array with nodes linked)
  private arrayToLinkedList(nodes: LinkedListNode[]): LinkedListNode[] {
    for (let i = 0; i < nodes.length - 1; i++) {
      nodes[i].next = nodes[i + 1];
    }
    return nodes;
  }

  // Helper: Print the result for debugging
  public printResult(): void {
    this.linkedLists.forEach((level, index) => {
      let output = `Level ${index}: `;
      let current = level[0]; // level is an array, get first node
      while (current) {
        output += `${current.val}->`;
        current = current.next;
      }
      console.log(output);
    });
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

const linkedLists = new LinkedLists();
const result = linkedLists.build(root);

console.log("Result:");
linkedLists.printResult();

// Expected output:
// Level 0: 5->
// Level 1: 3->7->
// Level 2: 2->4->6->8->
// Level 3: 1->

// ============ TEST CASE 2: Single Node ============
const singleRoot = new TreeNode(10);
const linkedLists2 = new LinkedLists();
const result2 = linkedLists2.build(singleRoot);
console.log("\nSingle Node Test:");
linkedLists2.printResult();
// Expected: Level 0: 10->

// ============ TEST CASE 3: Empty Tree ============
const linkedLists3 = new LinkedLists();
const result3 = linkedLists3.build(null);
console.log("\nEmpty Tree Test:");
console.log("Result length:", result3.length); // Expected: 0

// ============ COMPLEXITY ANALYSIS ============
/*
Time Complexity: O(n)
  - We visit each node exactly once
  - n = total number of nodes in tree

Space Complexity: O(w)
  - w = maximum width of tree (max nodes at any level)
  - Queue holds nodes from current level + children of current level (at most 2w nodes)
  - In worst case (complete binary tree), w ≈ n/2
  - Result array stores O(n) total nodes (all levels combined)

Auxiliary Space: O(h) for recursion stack in worst case (if we used DFS)
                 O(w) for queue in this BFS approach
*/

// ============ ALGORITHM EXPLANATION ============
/*
Approach: Custom Queue with Null Sentinel

Why this approach is elegant:
1. Uses null as a level boundary marker
2. When we dequeue null, it signals "all siblings processed, start new level"
3. No need to track queue size or complex level counters
4. Intuitive: process nodes until you hit null (sibling group done)

How it works:
1. Enqueue root + null marker
2. Loop while queue not empty:
   a. Create currentLevel array
   b. Dequeue and process nodes until we get null
   c. For each node, enqueue its children
   d. Convert currentLevel array to linked list
   e. If queue not empty, add null marker for next level

Key insight: When we dequeue null, we know all nodes at this level have
been processed (none more will be added after null), so we move to next level.

Edge cases:
- Empty tree: root is null, return empty array
- Single node: works correctly
- Unbalanced trees: still processes correctly
- Single child nodes: still tracks all levels

This is what makes your original intuition correct!
*/