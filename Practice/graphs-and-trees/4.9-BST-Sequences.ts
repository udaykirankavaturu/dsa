/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║              BST SEQUENCES — All Arrays That Could Build This BST           ║
 * ║                                                                              ║
 * ║  Problem: A BST was built by inserting elements left-to-right from an       ║
 * ║  array. Given the BST, return ALL arrays that could have produced it.       ║
 * ║                                                                              ║
 * ║  Key insight: The ROOT must always come first (it was inserted first).      ║
 * ║  After that, left and right subtree nodes can interleave in any order —     ║
 * ║  as long as each subtree's own relative insertion order is preserved.       ║
 * ║                                                                              ║
 * ║  That "interleaving" is exactly WEAVING from the previous problem!          ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 *
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │  THE BST WE'LL USE                                                          │
 * │                                                                             │
 * │               4          ← must be first in every valid sequence           │
 * │             /   \                                                           │
 * │           2       6      ← 2 must come before 1 and 3                     │
 * │          / \     / \       6 must come before 5 and 7                     │
 * │         1   3   5   7                                                      │
 * │                                                                             │
 * │  Some valid sequences:                                                      │
 * │    [4, 2, 1, 3, 6, 5, 7]   (full left then full right)                    │
 * │    [4, 6, 2, 5, 1, 7, 3]   (interleaved)                                  │
 * │    [4, 2, 6, 1, 5, 3, 7]   (interleaved)                                  │
 * │    ... many more                                                            │
 * └─────────────────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │  WHY LINKED LIST (as a queue / deque)?                                      │
 * │                                                                             │
 * │  The weave algorithm needs shift() and unshift() — O(1) if we use          │
 * │  a linked list, but O(n) for plain arrays (everything shifts in memory).   │
 * │                                                                             │
 * │  A linked list lets us:                                                     │
 * │    removeFirst()  →  O(1)   (move head pointer forward)                    │
 * │    addFirst(val)  →  O(1)   (prepend a new node)                           │
 * │                                                                             │
 * │  This matters because weave() calls these 4 times per recursion level.     │
 * └─────────────────────────────────────────────────────────────────────────────┘
 */

// ═══════════════════════════════════════════════════════════════════════════════
//  DATA STRUCTURES
// ═══════════════════════════════════════════════════════════════════════════════

/** A single node in a singly-linked list */
class ListNode<T> {
  constructor(
    public val: T,
    public next: ListNode<T> | null = null
  ) {}
}

/**
 * Minimal singly-linked list used as a deque.
 * Only the operations weave() needs are implemented.
 *
 *  head → [1] → [2] → [3] → null
 *          ↑                  ↑
 *        front              back
 */
class LinkedList<T> {
  head: ListNode<T> | null = null;
  tail: ListNode<T> | null = null;
  size: number = 0;

  /** Add to the END — O(1) via tail pointer */
  addLast(val: T): void {
    const node = new ListNode(val);
    if (!this.tail) {
      this.head = this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.size++;
  }

  /** Remove from FRONT — O(1) via head pointer */
  removeFirst(): T {
    if (!this.head) throw new Error("List is empty");
    const val = this.head.val;
    this.head = this.head.next;
    if (!this.head) this.tail = null;
    this.size--;
    return val;
  }

  /** Put back at FRONT (used in backtracking "unchoose" step) — O(1) */
  addFirst(val: T): void {
    const node = new ListNode(val, this.head);
    this.head = node;
    if (!this.tail) this.tail = node;
    this.size++;
  }

  /** Convert to array (for output / debugging) */
  toArray(): T[] {
    const arr: T[] = [];
    let cur = this.head;
    while (cur) { arr.push(cur.val); cur = cur.next; }
    return arr;
  }

  /** Clone — needed so weave branches don't share state */
  clone(): LinkedList<T> {
    const copy = new LinkedList<T>();
    let cur = this.head;
    while (cur) { copy.addLast(cur.val); cur = cur.next; }
    return copy;
  }

  get isEmpty(): boolean { return this.size === 0; }
}

/** A BST node */
class TreeNode {
  constructor(
    public val: number,
    public left: TreeNode | null = null,
    public right: TreeNode | null = null
  ) {}
}

// ═══════════════════════════════════════════════════════════════════════════════
//  THE WEAVE FUNCTION (from previous problem, now uses LinkedList)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Weaves two linked lists into all possible merged orderings,
 * preserving relative order within each list.
 * (Same algorithm as before — just swap array for LinkedList)
 */
function weave(
  left: LinkedList<number>,
  right: LinkedList<number>,
  prefix: LinkedList<number>,
  results: number[][]
): void {
  // BASE CASE: one side is empty → only one way to finish → record it
  if (left.isEmpty || right.isEmpty) {
    // clone prefix, append remaining left, append remaining right
    const result = prefix.toArray();
    let cur = left.head;
    while (cur) { result.push(cur.val); cur = cur.next; }
    cur = right.head;
    while (cur) { result.push(cur.val); cur = cur.next; }
    results.push(result);
    return;
  }

  // BRANCH 1: pick from left
  const headL = left.removeFirst();   // CHOOSE
  prefix.addLast(headL);
  weave(left, right, prefix, results); // RECURSE
  prefix.removeFirst();               // ← won't work — need removeLast!
  left.addFirst(headL);               // UNCHOOSE
  // ↑ Note: for prefix we need a removeLast. Let's fix that below.
  // (See WeaveFixed below — using an array for prefix is simpler and correct)
}

// ═══════════════════════════════════════════════════════════════════════════════
//  PRACTICAL NOTE ON PREFIX
// ═══════════════════════════════════════════════════════════════════════════════
/**
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  DESIGN CHOICE: prefix as Array, not LinkedList                         │
 * │                                                                         │
 * │  left/right use LinkedList → O(1) removeFirst / addFirst               │
 * │  prefix uses Array         → O(1) push / pop  (stack operations)       │
 * │                                                                         │
 * │  We only ever add/remove from the END of prefix (it's a stack),        │
 * │  so a plain array is perfect. No need for LinkedList there.            │
 * └─────────────────────────────────────────────────────────────────────────┘
 */
function weaveLists(
  left: LinkedList<number>,
  right: LinkedList<number>,
  prefix: number[],           // ← stack: push/pop from end
  results: number[][]
): void {

  // BASE CASE
  if (left.isEmpty || right.isEmpty) {
    const result = [
      ...prefix,
      ...left.toArray(),
      ...right.toArray()
    ];
    results.push(result);
    return;
  }

  // BRANCH 1: pick from left
  //
  //  left: [2]→[1]→[3]   right: [6]→[5]→[7]   prefix: [4]
  //  headL = 2
  //  left becomes: [1]→[3]   prefix: [4,2]
  //  recurse...
  //  restore: left: [2]→[1]→[3]   prefix: [4]
  const headL = left.removeFirst();  // CHOOSE
  prefix.push(headL);
  weaveLists(left, right, prefix, results);  // RECURSE
  prefix.pop();                              // UNCHOOSE
  left.addFirst(headL);                      // UNCHOOSE

  // BRANCH 2: pick from right
  //
  //  left: [2]→[1]→[3]   right: [6]→[5]→[7]   prefix: [4]
  //  headR = 6
  //  right becomes: [5]→[7]   prefix: [4,6]
  //  recurse...
  //  restore: right: [6]→[5]→[7]   prefix: [4]
  const headR = right.removeFirst(); // CHOOSE
  prefix.push(headR);
  weaveLists(left, right, prefix, results);  // RECURSE
  prefix.pop();                              // UNCHOOSE
  right.addFirst(headR);                     // UNCHOOSE
}

// ═══════════════════════════════════════════════════════════════════════════════
//  THE MAIN FUNCTION — allSequences
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │  RECURSIVE STRUCTURE — allSequences(node)                                  │
 * │                                                                             │
 * │  Think of it as: "What are all insertion sequences for the subtree         │
 * │  rooted at `node`?"                                                        │
 * │                                                                             │
 * │  BASE CASE:                                                                │
 * │    node is null → the subtree is empty → one valid sequence: []            │
 * │    Return [ [] ]  (a list containing one empty sequence)                   │
 * │                                                                             │
 * │    Why not just return []?                                                  │
 * │    Because weave needs to iterate over sequences. An empty subtree         │
 * │    contributes exactly one sequence — the empty sequence — not zero.       │
 * │    Returning [] (no sequences) would make the weave produce nothing.       │
 * │                                                                             │
 * │  RECURSIVE CASE:                                                            │
 * │    1. Get allSequences(node.left)   → list of sequences for left subtree  │
 * │    2. Get allSequences(node.right)  → list of sequences for right subtree │
 * │    3. For every pair (leftSeq, rightSeq):                                  │
 * │         weave them together (preserving each seq's order)                  │
 * │         prepend node.val to every resulting weave                          │
 * │    4. Collect all results and return                                        │
 * └─────────────────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │  VISUAL WALKTHROUGH on our BST                                              │
 * │                                                                             │
 * │               4                                                             │
 * │             /   \                                                           │
 * │           2       6                                                         │
 * │          / \     / \                                                        │
 * │         1   3   5   7                                                       │
 * │                                                                             │
 * │  allSequences(1) → leaf → [ [1] ]                                          │
 * │  allSequences(3) → leaf → [ [3] ]                                          │
 * │                                                                             │
 * │  allSequences(2):                                                           │
 * │    leftSeqs  = [ [1] ]                                                      │
 * │    rightSeqs = [ [3] ]                                                      │
 * │    weave([1], [3]):                                                         │
 * │      → [1,3]  (1 first)                                                    │
 * │      → [3,1]  (3 first)                                                    │
 * │    prepend 2 to each → [ [2,1,3], [2,3,1] ]                               │
 * │                                                                             │
 * │  allSequences(5) → [ [5] ]                                                  │
 * │  allSequences(7) → [ [7] ]                                                  │
 * │                                                                             │
 * │  allSequences(6):                                                           │
 * │    leftSeqs  = [ [5] ]                                                      │
 * │    rightSeqs = [ [7] ]                                                      │
 * │    weave([5], [7]) → [5,7], [7,5]                                          │
 * │    prepend 6 → [ [6,5,7], [6,7,5] ]                                        │
 * │                                                                             │
 * │  allSequences(4):                                                           │
 * │    leftSeqs  = [ [2,1,3], [2,3,1] ]          (2 sequences)                │
 * │    rightSeqs = [ [6,5,7], [6,7,5] ]          (2 sequences)                │
 * │                                                                             │
 * │    Pair every leftSeq with every rightSeq (cartesian product):             │
 * │      weave([2,1,3], [6,5,7]) → ? weaves                                   │
 * │      weave([2,1,3], [6,7,5]) → ? weaves                                   │
 * │      weave([2,3,1], [6,5,7]) → ? weaves                                   │
 * │      weave([2,3,1], [6,7,5]) → ? weaves                                   │
 * │                                                                             │
 * │    Each weave of two length-3 arrays gives C(6,3)=20 results.             │
 * │    But we have 4 pairs → up to 80 results.                                │
 * │    Prepend 4 to each → final answer.                                       │
 * └─────────────────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │  THE BASE CASE VISUALISED                                                   │
 * │                                                                             │
 * │  allSequences(null):                                                        │
 * │    The subtree is empty. There is EXACTLY ONE way to insert nothing:        │
 * │    do nothing. So return [ [] ] — one sequence, which is empty.            │
 * │                                                                             │
 * │  Why does this matter?                                                      │
 * │                                                                             │
 * │  allSequences(leaf node, e.g. node=1):                                     │
 * │    leftSeqs  = allSequences(null) = [ [] ]                                 │
 * │    rightSeqs = allSequences(null) = [ [] ]                                 │
 * │    weave([], []) → base case immediately → push prefix → [ [] ]            │
 * │    prepend 1 → [ [1] ]        ✓                                            │
 * │                                                                             │
 * │  If we returned [] instead of [ [] ]:                                      │
 * │    The for-loop "for leftSeq of leftSeqs" would never execute.             │
 * │    We'd get no sequences at all — wrong!                                   │
 * └─────────────────────────────────────────────────────────────────────────────┘
 */

/**
 * Returns all insertion sequences that could have produced the BST
 * rooted at `node`.
 *
 * @param node - Root of the current subtree (null = empty subtree)
 * @returns    Array of valid insertion sequences (each sequence is number[])
 */
function allSequences(node: TreeNode | null): number[][] {

  // ─── BASE CASE: empty subtree ───────────────────────────────────────────
  // One valid sequence for an empty tree: insert nothing → []
  // Return [ [] ] not [] — see diagram above for why this matters.
  if (node === null) {
    return [[]];
  }

  // ─── RECURSIVE CASE ─────────────────────────────────────────────────────

  // Step 1: get all sequences for the left subtree
  //
  //   allSequences(node.left) recursively solves the same problem for a
  //   smaller tree. By induction, trust it returns the correct answer.
  const leftSeqs: number[][] = allSequences(node.left);

  // Step 2: get all sequences for the right subtree
  const rightSeqs: number[][] = allSequences(node.right);

  // Step 3: weave every leftSeq with every rightSeq, prepend current node
  //
  //  Why every pair? Because the left and right subtrees are INDEPENDENT.
  //  Any left-subtree insertion order can be combined with any right-subtree
  //  insertion order — they don't constrain each other.
  //
  //  leftSeqs × rightSeqs  (cartesian product)
  //       ↓ for each pair
  //  weaveLists(leftSeq, rightSeq, prefix=[node.val], results)
  //       ↓
  //  each result already has node.val prepended (via initial prefix)

  const results: number[][] = [];

  for (const leftSeq of leftSeqs) {
    for (const rightSeq of rightSeqs) {

      // Convert arrays → LinkedLists for O(1) front operations
      //
      //  leftSeq=[2,1,3]  →  [2]→[1]→[3]→null
      const leftList = new LinkedList<number>();
      for (const v of leftSeq) leftList.addLast(v);

      const rightList = new LinkedList<number>();
      for (const v of rightSeq) rightList.addLast(v);

      // prefix starts with current node — it will be prepended to every weave.
      //
      //  node=4, so every result starts with [4, ...]
      const prefix: number[] = [node.val];

      weaveLists(leftList, rightList, prefix, results);
    }
  }

  return results;
}

// ═══════════════════════════════════════════════════════════════════════════════
//  BUILD THE BST MANUALLY & RUN
// ═══════════════════════════════════════════════════════════════════════════════

/**
 *        4
 *      /   \
 *    2       6
 *   / \     / \
 *  1   3   5   7
 */
function buildBST(): TreeNode {
  const root = new TreeNode(4);
  root.left  = new TreeNode(2, new TreeNode(1), new TreeNode(3));
  root.right = new TreeNode(6, new TreeNode(5), new TreeNode(7));
  return root;
}

/** Helper: insert a value into a BST (to verify sequences rebuild same BST) */
function insertBST(root: TreeNode | null, val: number): TreeNode {
  if (!root) return new TreeNode(val);
  if (val < root.val) root.left  = insertBST(root.left,  val);
  else                root.right = insertBST(root.right, val);
  return root;
}

/** Helper: serialize a BST to a string for easy comparison */
function serializeBST(node: TreeNode | null): string {
  if (!node) return "null";
  return `(${serializeBST(node.left)} ← ${node.val} → ${serializeBST(node.right)})`;
}

// ─── Run ────────────────────────────────────────────────────────────────────

const bst = buildBST();
const originalSignature = serializeBST(bst);

console.log("BST structure:");
console.log(originalSignature);
console.log();

const sequences = allSequences(bst);

console.log(`Total valid sequences: ${sequences.length}`);
console.log();

// Verify: rebuild BST from each sequence → should match original
let allMatch = true;
for (const seq of sequences) {
  let rebuilt: TreeNode | null = null;
  for (const val of seq) rebuilt = insertBST(rebuilt, val);
  if (serializeBST(rebuilt) !== originalSignature) {
    allMatch = false;
    console.error(`MISMATCH for sequence: ${JSON.stringify(seq)}`);
  }
}
console.log(`All sequences rebuild the same BST? ${allMatch ? "✓ YES" : "✗ NO"}`);
console.log();

console.log("First 5 sequences:");
sequences.slice(0, 5).forEach((s, i) => {
  console.log(`  [${i + 1}] ${JSON.stringify(s)}`);
});
console.log("  ...");
console.log(`Last sequence: ${JSON.stringify(sequences[sequences.length - 1])}`);

/**
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │  COMPLEXITY SUMMARY                                                         │
 * │                                                                             │
 * │  Let n = number of nodes in the BST.                                       │
 * │                                                                             │
 * │  The number of sequences is  n! / (product of subtree sizes)               │
 * │  For a balanced BST of 7 nodes it's 80.                                    │
 * │                                                                             │
 * │  Time:  O(output size × n) — generating + copying each sequence            │
 * │  Space: O(output size × n) — storing all sequences                         │
 * │                                                                             │
 * │  The recursion call stack depth is O(n) (height of BST).                  │
 * └─────────────────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │  MENTAL MODEL — "Delegating to subtrees"                                   │
 * │                                                                             │
 * │  Each call to allSequences(node) says:                                     │
 * │                                                                             │
 * │    "I don't care HOW you got those sequences, left-subtree.                │
 * │     I just know that whatever sequences you give me are valid.             │
 * │     Same for you, right-subtree.                                           │
 * │     My job is to combine your answers and stamp my value at the front."   │
 * │                                                                             │
 * │  This is the recursive leap of faith — trust the subproblem,              │
 * │  focus only on what the current node contributes.                          │
 * └─────────────────────────────────────────────────────────────────────────────┘
 */