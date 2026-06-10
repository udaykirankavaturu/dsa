"use strict";
/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║                        MIN HEAP  (TypeScript)                    ║
 * ║                                                                  ║
 * ║  A complete binary tree where every parent node is SMALLER       ║
 * ║  than (or equal to) its children.                                ║
 * ║                                                                  ║
 * ║  Visual Example:                                                 ║
 * ║                                                                  ║
 * ║              1          ← root (always minimum)                  ║
 * ║            /   \                                                 ║
 * ║           3     2                                                ║
 * ║          / \   / \                                               ║
 * ║         7   4 5   6                                              ║
 * ║                                                                  ║
 * ║  Stored as array: [1, 3, 2, 7, 4, 5, 6]                        ║
 * ║                    0  1  2  3  4  5  6   ← indices              ║
 * ║                                                                  ║
 * ║  Index Relationships for node at index i:                        ║
 * ║    Parent      → Math.floor((i - 1) / 2)                        ║
 * ║    Left Child  → 2 * i + 1                                      ║
 * ║    Right Child → 2 * i + 2                                      ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * TypeScript additions over the JS version:
 *   ✅ Generic class  MinHeap<T>  — works with numbers, strings, objects
 *   ✅ Comparator function  (a: T, b: T) => number  — caller decides ordering
 *   ✅ Strict return types on every method
 *   ✅ Private modifier instead of _ prefix convention
 *   ✅ readonly on the comparator so it cannot be reassigned
 *
 * Time Complexities:
 *   insert()    → O(log n)   — bubble up from leaf to root
 *   extractMin  → O(log n)   — bubble down from root to leaf
 *   peek()      → O(1)       — always at index 0
 *   size()      → O(1)
 */
// ─────────────────────────────────────────────────────────────
//  MIN HEAP  (generic)
// ─────────────────────────────────────────────────────────────
class MinHeap {
    /**
     * Internal storage: a flat array representing the complete binary tree.
     *
     * Tree:           Array index:
     *      1          heap[0] = 1   (root)
     *    /   \        heap[1] = 3   (left child of root)
     *   3     2       heap[2] = 2   (right child of root)
     *  / \            heap[3] = 7   (left child of index 1)
     * 7   4           heap[4] = 4   (right child of index 1)
     */
    heap = [];
    /**
     * Comparator supplied by the caller.
     * readonly prevents accidental reassignment after construction.
     *
     * Default: numeric ascending  (standard min-heap for numbers)
     */
    comparator;
    /**
     * @param comparator  Optional. Defaults to numeric ascending order.
     *                    Pass a custom comparator to use with strings,
     *                    objects, or any other orderable type.
     *
     * Usage:
     *   const numHeap = new MinHeap<number>();
     *   const strHeap = new MinHeap<string>((a, b) => a.localeCompare(b));
     *   const objHeap = new MinHeap<Task>((a, b) => a.priority - b.priority);
     */
    constructor(comparator = (a, b) => a - b) {
        this.comparator = comparator;
    }
    // ─────────────────────────────────────────────
    //  PRIVATE INDEX HELPERS
    // ─────────────────────────────────────────────
    /**
     * Returns the index of the parent of node at index i.
     *
     *   i = 3 (value 7)
     *   parent = floor((3 - 1) / 2) = 1  (value 3) ✓
     *
     *        [0]1
     *       /      \
     *    [1]3      [2]2
     *    /   \
     * [3]7  [4]4
     */
    parentIdx(i) {
        return Math.floor((i - 1) / 2);
    }
    /**
     * Returns the index of the LEFT child of node at index i.
     *
     *   i = 1 (value 3)
     *   leftChild = 2 * 1 + 1 = 3 (value 7) ✓
     */
    leftChildIdx(i) {
        return 2 * i + 1;
    }
    /**
     * Returns the index of the RIGHT child of node at index i.
     *
     *   i = 1 (value 3)
     *   rightChild = 2 * 1 + 2 = 4 (value 4) ✓
     */
    rightChildIdx(i) {
        return 2 * i + 2;
    }
    /**
     * Swaps two elements in the heap array by index.
     * TypeScript destructuring assignment — no temp variable needed.
     */
    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
    /**
     * Compares two elements using the stored comparator.
     * Returns true if element at index `a` is SMALLER than at `b`.
     *
     * Centralising the comparison here means we only change one place
     * if the ordering logic ever needs to change.
     */
    isSmaller(idxA, idxB) {
        return this.comparator(this.heap[idxA], this.heap[idxB]) < 0;
    }
    // ─────────────────────────────────────────────
    //  PUBLIC API
    // ─────────────────────────────────────────────
    /** Returns the number of elements in the heap. */
    size() {
        return this.heap.length;
    }
    /** Returns true if the heap contains no elements. */
    isEmpty() {
        return this.heap.length === 0;
    }
    /**
     * Returns the minimum element WITHOUT removing it.
     * The minimum is always at index 0 (the root).
     *
     * Return type is `T | null`:
     *   T     → heap has at least one element
     *   null  → heap is empty (caller must handle this)
     *
     * Time: O(1)
     */
    peek() {
        return this.isEmpty() ? null : this.heap[0];
    }
    // ─────────────────────────────────────────────
    //  INSERT  →  O(log n)
    // ─────────────────────────────────────────────
    /**
     * Insert a new value into the heap.
     *
     * Strategy: "Bubble Up" (a.k.a. sift-up / percolate-up)
     *   1. Append the new value at the END of the array (last leaf position).
     *   2. Compare it with its parent.
     *   3. If it is SMALLER than its parent → swap them.
     *   4. Repeat until the heap property is restored or we reach the root.
     *
     * Example: Insert 2 into this heap:
     *
     *   Before:           After append:       After bubble-up:
     *        5                 5                    2
     *       / \               / \                  / \
     *      7   8             7   8                5   8
     *     /                 / \                  / \
     *    9                 9   2 ← new          9   7
     *
     *   Step 1: 2 appended at index 4
     *   Step 2: parent(4) = index 1, value 7 → 2 < 7 → SWAP
     *   Step 3: parent(1) = index 0, value 5 → 2 < 5 → SWAP
     *   Step 4: reached root → done
     */
    insert(value) {
        // Step 1: Place new value at the end (a new leaf node)
        this.heap.push(value);
        // Step 2: Restore heap property by bubbling up
        this.bubbleUp(this.heap.length - 1);
    }
    /**
     * Bubble the element at index `i` upward until the min-heap
     * property is restored.
     *
     *   while (i > 0 AND heap[i] < heap[parent]):
     *       swap(i, parent)
     *       i = parent
     */
    bubbleUp(i) {
        while (i > 0) {
            const parent = this.parentIdx(i);
            if (this.isSmaller(i, parent)) {
                // Current node is smaller than parent → heap violation → fix it
                this.swap(i, parent);
                i = parent; // move the pointer up toward the root
            }
            else {
                // Parent is already ≤ current node → heap property satisfied
                break;
            }
        }
    }
    // ─────────────────────────────────────────────
    //  EXTRACT MIN  →  O(log n)
    // ─────────────────────────────────────────────
    /**
     * Remove and return the minimum element (the root).
     *
     * Strategy: "Bubble Down" (a.k.a. sift-down / heapify-down)
     *   1. Save the root (minimum) to return later.
     *   2. Move the LAST leaf to the root position.
     *   3. Shrink the array by 1 (the last leaf is now at root).
     *   4. Bubble the new root DOWN: repeatedly swap with the
     *      SMALLER child until the heap property is restored.
     *
     * Example: Extract min from [1, 3, 2, 7, 4, 5, 9]:
     *
     *    Before:        Step 2-3: last → root    Step 4: Bubble down:
     *       1                  9                         2
     *      / \                / \                       / \
     *     3   2              3   2                     3   9
     *    / \ / \            / \ /                     / \ /
     *   7  4 5  9          7  4 5                    7  4 5
     *
     *   9 vs children (3, 2): 2 is smallest → SWAP(9, 2)
     *   9 vs children (5, –): 5 < 9 → SWAP(9, 5)
     *   9 is now a leaf → done
     */
    extractMin() {
        if (this.isEmpty())
            return null;
        // Step 1: Save the minimum value at root
        const min = this.heap[0];
        // Step 2: Pull off the last element
        const last = this.heap.pop(); // non-null because we checked isEmpty
        if (!this.isEmpty()) {
            // Step 3: Place it at the root (overwrites the old minimum)
            this.heap[0] = last;
            // Step 4: Restore heap property by sinking the new root
            this.bubbleDown(0);
        }
        return min;
    }
    /**
     * Bubble the element at index `i` downward until the min-heap
     * property is restored.
     *
     * At each step, find the SMALLER of the two children.
     * If it is smaller than the current node → swap and continue.
     *
     *   while (left child exists):
     *       smallest = index with smallest value among {i, left, right}
     *       if smallest ≠ i:
     *           swap(i, smallest)
     *           i = smallest
     *       else:
     *           break
     */
    bubbleDown(i) {
        const length = this.heap.length;
        while (true) {
            const left = this.leftChildIdx(i);
            const right = this.rightChildIdx(i);
            // Start by assuming the current node is the smallest
            let smallest = i;
            // Is the left child smaller than current?
            if (left < length && this.isSmaller(left, smallest)) {
                smallest = left;
            }
            // Is the right child smaller than both current and left?
            if (right < length && this.isSmaller(right, smallest)) {
                smallest = right;
            }
            if (smallest !== i) {
                // A child is smaller → swap and continue sinking
                this.swap(i, smallest);
                i = smallest;
            }
            else {
                // Current node is already the smallest → heap property restored
                break;
            }
        }
    }
    // ─────────────────────────────────────────────
    //  HEAPIFY  →  O(n)
    // ─────────────────────────────────────────────
    /**
     * Build a min-heap from an arbitrary array IN-PLACE.
     *
     * Naive approach: insert each element one by one → O(n log n)
     *
     * Optimal approach — Floyd's Algorithm:
     *   Start from the LAST NON-LEAF node and bubble DOWN each node.
     *   Leaf nodes (bottom half of the array) already trivially satisfy
     *   the heap property, so we skip them.
     *
     *   Last non-leaf index = Math.floor(n / 2) - 1
     *
     * Why is this O(n) and not O(n log n)?
     *   Most nodes are near the bottom of the tree and only need to
     *   travel a short distance downward. The math works out to O(n).
     *
     * Example: heapify([9, 4, 7, 1, 8, 3, 5])
     *
     *   Initial tree:          Final min-heap:
     *         9                      1
     *        / \                    / \
     *       4   7                  4   3
     *      / \ / \                / \ / \
     *     1  8 3  5              9  8 7  5
     *
     *   Process (right-to-left among non-leaves):
     *     idx 2 (val 7): children 3, 5 → 3 < 7 → swap → 3 at idx 2
     *     idx 1 (val 4): children 1, 8 → 1 < 4 → swap → 1 at idx 1
     *     idx 0 (val 9): children 1, 3 → 1 < 9 → swap → 1 at root
     *                    9 moves to idx 1; children 4, 8 → no swap needed
     */
    heapify(array) {
        this.heap = [...array]; // copy to avoid mutating the caller's array
        const lastNonLeaf = Math.floor(this.heap.length / 2) - 1;
        // Work backwards from last non-leaf → root
        for (let i = lastNonLeaf; i >= 0; i--) {
            this.bubbleDown(i);
        }
    }
    // ─────────────────────────────────────────────
    //  UTILITY
    // ─────────────────────────────────────────────
    /**
     * Returns a shallow copy of the internal array.
     *
     * ⚠️  The array satisfies HEAP ORDER, not sort order.
     *     To get sorted values, repeatedly call extractMin().
     */
    toArray() {
        return [...this.heap];
    }
    /**
     * Prints a level-order (BFS) layout of the heap to the console.
     * Useful for visualising the tree structure during debugging.
     *
     * Example output:
     *   ── MinHeap ──────────────────
     *   Level 0: [1]
     *   Level 1: [3  2]
     *   Level 2: [7  4  5  6]
     *   Array: [1, 3, 2, 7, 4, 5, 6]
     *   ─────────────────────────────
     */
    print() {
        if (this.isEmpty()) {
            console.log("(empty heap)");
            return;
        }
        let level = 0;
        let levelSize = 1; // nodes per level: 1, 2, 4, 8 …
        let i = 0;
        const lines = [];
        while (i < this.heap.length) {
            const row = [];
            for (let j = 0; j < levelSize && i < this.heap.length; j++, i++) {
                row.push(this.heap[i]);
            }
            lines.push(`Level ${level}: [${row.join("  ")}]`);
            level++;
            levelSize *= 2;
        }
        console.log("── MinHeap ──────────────────");
        lines.forEach(l => console.log(l));
        console.log(`Array: [${this.heap.join(", ")}]`);
        console.log("─────────────────────────────");
    }
}
// ═══════════════════════════════════════════════════════════
//  STANDALONE UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════
/**
 * Heap Sort using MinHeap.
 *
 * 1. heapify the array  → O(n)
 * 2. extractMin n times → O(n log n)
 * Overall: O(n log n), Space: O(n) for the result array
 *
 * @param arr        Input array (not mutated)
 * @param comparator Optional. Defaults to numeric ascending.
 * @returns          New sorted array (ascending by default)
 */
function heapSort(arr, comparator) {
    const h = new MinHeap(comparator);
    h.heapify(arr); // O(n)
    return arr.map(() => h.extractMin()); // O(n log n)
}
// ═══════════════════════════════════════════════════════════
//  DEMO — step-by-step traces
// ═══════════════════════════════════════════════════════════
console.log("═══════════════════════════════════════════");
console.log("  MIN HEAP (TypeScript) — Step-by-step Demo");
console.log("═══════════════════════════════════════════\n");
// ── 1. NUMERIC MIN-HEAP ──────────────────────────────────────
console.log("▶ [1] Numeric MinHeap — insert: 10, 4, 15, 1, 9, 3\n");
const numHeap = new MinHeap();
[10, 4, 15, 1, 9, 3].forEach(v => {
    numHeap.insert(v);
    console.log(`  insert(${v.toString().padStart(2)})  →  array: [${numHeap.toArray()}]`);
});
console.log();
numHeap.print();
/*
  Expected tree:
           1
          / \
         4   3
        / \ /
       10  9 15

  Array: [1, 4, 3, 10, 9, 15]
*/
// ── 2. PEEK ──────────────────────────────────────────────────
console.log(`\n▶ peek() → ${numHeap.peek()}  (minimum, no removal)\n`);
// ── 3. EXTRACT MIN ───────────────────────────────────────────
console.log("▶ Extracting minimums one by one:\n");
while (!numHeap.isEmpty()) {
    const min = numHeap.extractMin();
    console.log(`  extractMin() → ${min}   heap now: [${numHeap.toArray()}]`);
}
/*
  Expected (ascending):
  extractMin() → 1
  extractMin() → 3
  extractMin() → 4
  extractMin() → 9
  extractMin() → 10
  extractMin() → 15
*/
// ── 4. HEAPIFY ───────────────────────────────────────────────
console.log("\n▶ heapify([9, 4, 7, 1, 8, 3, 5])\n");
const heapFromArray = new MinHeap();
heapFromArray.heapify([9, 4, 7, 1, 8, 3, 5]);
heapFromArray.print();
/*
  Expected tree:
         1
        / \
       4   3
      / \ / \
     9  8 7  5
*/
// ── 5. GENERIC: STRING HEAP ───────────────────────────────────
console.log("▶ [2] String MinHeap (lexicographic order)\n");
const strHeap = new MinHeap((a, b) => a.localeCompare(b));
["banana", "apple", "mango", "cherry"].forEach(s => strHeap.insert(s));
strHeap.print();
console.log("  Extracting in order:");
while (!strHeap.isEmpty()) {
    console.log(`  → ${strHeap.extractMin()}`);
}
console.log("\n▶ [3] Object MinHeap (Task priority queue)\n");
const taskHeap = new MinHeap((a, b) => a.priority - b.priority);
taskHeap.insert({ name: "Write tests", priority: 2 });
taskHeap.insert({ name: "Fix prod bug", priority: 1 }); // highest priority
taskHeap.insert({ name: "Code review", priority: 3 });
taskHeap.insert({ name: "Update docs", priority: 4 });
console.log("  Processing tasks by priority:");
while (!taskHeap.isEmpty()) {
    const task = taskHeap.extractMin();
    console.log(`  [P${task.priority}] ${task.name}`);
}
/*
  Expected:
  [P1] Fix prod bug
  [P2] Write tests
  [P3] Code review
  [P4] Update docs
*/
// ── 7. HEAP SORT ─────────────────────────────────────────────
console.log("\n▶ [4] Heap Sort\n");
const unsorted = [5, 3, 8, 1, 2, 9, 4, 7, 6];
console.log("  Input:  ", unsorted);
console.log("  Sorted: ", heapSort(unsorted));
const words = ["mango", "apple", "kiwi", "banana"];
console.log("\n  Input:  ", words);
console.log("  Sorted: ", heapSort(words, (a, b) => a.localeCompare(b)));
