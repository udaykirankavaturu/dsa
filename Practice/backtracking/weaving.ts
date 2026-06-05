/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║              WEAVING TWO ARRAYS — Keeping Relative Order                    ║
 * ║                                                                              ║
 * ║  Problem: Given two arrays A and B, return ALL possible merged arrays       ║
 * ║  such that the relative order within A and within B is preserved.           ║
 * ║                                                                              ║
 * ║  Example:                                                                    ║
 * ║    A = [1, 2]  B = [4, 5]                                                   ║
 * ║    Result:                                                                   ║
 * ║      [1, 2, 4, 5]   ← A first, then B                                      ║
 * ║      [1, 4, 2, 5]   ← interleaved                                           ║
 * ║      [1, 4, 5, 2]   ← interleaved                                           ║
 * ║      [4, 1, 2, 5]   ← interleaved                                           ║
 * ║      [4, 1, 5, 2]   ← interleaved                                           ║
 * ║      [4, 5, 1, 2]   ← B first, then A                                      ║
 * ║                                                                              ║
 * ║  Notice: 1 always appears before 2, and 4 always appears before 5.         ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 *
 * ┌─────────────────────────────────────────────────────────┐
 * │  HOW MANY RESULTS?                                      │
 * │                                                         │
 * │  If |A| = m and |B| = n, the count is C(m+n, n)       │
 * │  (combinations: choose n positions out of m+n total)   │
 * │                                                         │
 * │  A=[1,2,3] B=[4,5,6]: C(6,3) = 20 results             │
 * └─────────────────────────────────────────────────────────┘
 */

/**
 * ┌──────────────────────────────────────────────────────────────────────────┐
 * │  CORE IDEA — The Binary Choice Tree                                      │
 * │                                                                          │
 * │  At every step, you face ONE decision:                                   │
 * │    → Pick the FRONT of left array, OR                                    │
 * │    → Pick the FRONT of right array                                       │
 * │                                                                          │
 * │  This builds a binary decision tree. Each leaf = one valid weave.       │
 * │                                                                          │
 * │  A=[1,2]  B=[4,5]  prefix=[]                                            │
 * │                   (pick 1 or 4?)                                         │
 * │                  /              \                                         │
 * │            pick 1                pick 4                                  │
 * │         prefix=[1]            prefix=[4]                                 │
 * │         A=[2] B=[4,5]         A=[1,2] B=[5]                             │
 * │          /        \             /        \                               │
 * │       pick 2     pick 4      pick 1     pick 5                          │
 * │       [1,2]      [1,4]       [4,1]      [4,5]                           │
 * │       A=[] B=[4,5]  A=[2] B=[5]  A=[2] B=[5]  A=[1,2] B=[]            │
 * │         |          /   \        /   \       |                            │
 * │     append B    pick 2  pick5  pick1 pick5  append A                    │
 * │    [1,2,4,5]  [1,4,2] [1,4,5] [4,1,2][4,1,5] [4,5,1,2]                │
 * │                  |       |      |       |                                │
 * │              append B append A  appB   appA                              │
 * │              [1,4,2,5][1,4,5,2][4,1,2,5][4,1,5,2]                      │
 * │                                                                          │
 * │  Leaves (6 total) = C(4,2) = 6 ✓                                        │
 * └──────────────────────────────────────────────────────────────────────────┘
 *
 * ┌──────────────────────────────────────────────────────────────────────────┐
 * │  BACKTRACKING PATTERN (choose → recurse → unchoose)                     │
 * │                                                                          │
 * │  weave(left, right, prefix, results):                                    │
 * │    if left is empty OR right is empty:                                   │
 * │      results.push([...prefix, ...left, ...right])  ← base case          │
 * │      return                                                               │
 * │                                                                          │
 * │    // Branch 1: pick from left                                           │
 * │    headL = left.shift()          ← CHOOSE (remove from front)           │
 * │    prefix.push(headL)                                                    │
 * │    weave(left, right, prefix, results)  ← RECURSE                       │
 * │    prefix.pop()                  ← UNCHOOSE (undo prefix)               │
 * │    left.unshift(headL)           ← UNCHOOSE (restore left)              │
 * │                                                                          │
 * │    // Branch 2: pick from right (same pattern)                           │
 * │    headR = right.shift()                                                 │
 * │    prefix.push(headR)                                                    │
 * │    weave(left, right, prefix, results)                                   │
 * │    prefix.pop()                                                          │
 * │    right.unshift(headR)                                                  │
 * └──────────────────────────────────────────────────────────────────────────┘
 */

/**
 * Recursively weaves two arrays into all possible merged orderings,
 * preserving the relative order of elements within each input array.
 *
 * @param left    - Remaining elements from the first array (mutated during recursion, restored after)
 * @param right   - Remaining elements from the second array (same)
 * @param prefix  - Elements picked so far in the current branch (the "path" being built)
 * @param results - Accumulator: all completed weaves are pushed here
 *
 * @example
 * const results: number[][] = [];
 * weave([1, 2], [4, 5], [], results);
 * // results → [[1,2,4,5], [1,4,2,5], [1,4,5,2], [4,1,2,5], [4,1,5,2], [4,5,1,2]]
 */
function weave(
  left: number[],
  right: number[],
  prefix: number[],
  results: number[][]
): void {
    // base case
    if(left.length === 0 || right.length === 0){
        results.push([...prefix, ...left, ...right]);
        return;
    }

    // pick from left
    let leftHead = left.shift()!;
    prefix.push(leftHead);
    weave(left, right, prefix, results);
    prefix.pop();
    left.unshift(leftHead);

    // pick from right
    let rightHead = right.shift()!;
    prefix.push(rightHead);
    weave(left, right, prefix, results);
    prefix.pop();
    right.unshift(rightHead);

}

/**
 * Public entry point.
 * Initialises the prefix and results collector, then kicks off the recursion.
 *
 * @param a - First array  (relative order preserved in output)
 * @param b - Second array (relative order preserved in output)
 * @returns All possible interleavings of a and b
 *
 * Time complexity:  O(C(m+n, n) · (m+n))
 *   — C(m+n, n) results, each of length m+n to copy into the results array.
 *     For a=[1,2,3] b=[4,5,6]: C(6,3)=20 results of length 6 → 120 ops.
 *
 * Space complexity: O(m+n) auxiliary (prefix + call stack depth)
 *   — Results array itself is O(C(m+n,n)·(m+n)) which is unavoidable since
 *     that's the size of the output.
 */
function allWeavings(a: number[], b: number[]): number[][] {
  const results: number[][] = [];

  // We pass copies so the original arrays a and b are never touched.
  // Internally weave() mutates and restores, but we don't want the caller
  // to notice any side effects.
  weave([...a], [...b], [], results);

  return results;
}

// ═══════════════════════════════════════════════════════════════════════════════
//  DEMO
// ═══════════════════════════════════════════════════════════════════════════════

const a = [1, 2, 3];
const b = [4, 5, 6];

const weavings = allWeavings(a, b);

console.log(`\nWeaving a=${JSON.stringify(a)} and b=${JSON.stringify(b)}`);
console.log(`Expected count: C(${a.length + b.length}, ${b.length}) = 20`);
console.log(`Actual count:   ${weavings.length}\n`);

weavings.forEach((w, i) => {
  // Visual: mark which slot came from a (○) or b (●)
  const visual = w.map(x => (a.includes(x) ? `○${x}` : `●${x}`)).join(" ");
  console.log(`  [${String(i + 1).padStart(2)}]  ${visual}`);
});

/**
 * Sample output (first few lines):
 *
 *   [ 1]  ○1 ○2 ○3 ●4 ●5 ●6
 *   [ 2]  ○1 ○2 ●4 ○3 ●5 ●6
 *   [ 3]  ○1 ○2 ●4 ●5 ○3 ●6
 *   [ 4]  ○1 ○2 ●4 ●5 ●6 ○3
 *   [ 5]  ○1 ●4 ○2 ○3 ●5 ●6
 *   ...
 *   [20]  ●4 ●5 ●6 ○1 ○2 ○3
 *
 *  ○ = from array a   ● = from array b
 *  Notice: ○ numbers always appear in order 1→2→3 ✓
 *          ● numbers always appear in order 4→5→6 ✓
 */

/**
 * ┌────────────────────────────────────────────────────────────────┐
 * │  CALL STACK TRACE  (small example: a=[1] b=[4,5])             │
 * │                                                                │
 * │  weave([1],[4,5],[],[])                                        │
 * │  ├─ Branch L: pick 1                                          │
 * │  │  weave([],[4,5],[1],[])          ← left empty!             │
 * │  │  └─ push [1,4,5]                                           │
 * │  │  (restore: left=[1], prefix=[])                            │
 * │  │                                                             │
 * │  └─ Branch R: pick 4                                          │
 * │     weave([1],[5],[4],[])                                      │
 * │     ├─ Branch L: pick 1                                       │
 * │     │  weave([],[5],[4,1],[])       ← left empty!             │
 * │     │  └─ push [4,1,5]                                        │
 * │     │  (restore)                                              │
 * │     │                                                          │
 * │     └─ Branch R: pick 5                                       │
 * │        weave([1],[],[4,5],[])       ← right empty!            │
 * │        └─ push [4,5,1]                                        │
 * │        (restore)                                              │
 * │                                                                │
 * │  Final results: [[1,4,5], [4,1,5], [4,5,1]]                  │
 * │  Count: C(3,1) = 3 ✓                                          │
 * └────────────────────────────────────────────────────────────────┘
 */