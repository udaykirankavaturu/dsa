"use strict";
/**
 * 4.7 Build Order
 * You are given a list of projects and a list of dependencies (which is a list of pairs of projects,
 * where the second project is dependent on the first project).
 * All of a project's dependencies must be built before the project is.
 * Find a build order that will allow the projects to be built.
 * If there is no valid build order, return an error.
 */
// ============ EXAMPLE 1 ============
// Input:
// projects: ["a","b","c","d","e","f"]
// dependencies: [["a","d"],["f","b"],["b","d"],["f","a"],["d","c"]]
//
// Output: ["f","e","a","b","d","c"]
// ============ EXAMPLE 2 ============
// Input:
// projects: ["a","b"]
// dependencies: [["a","b"],["b","a"]]
//
// Output: Error (circular dependency)
/**
 * approach
 * build a dependency graph
 *
 * a->d
 * f->b,a
 * b->d
 * d->c
 *
 * stack --> ['c', 'd', 'a', 'b', 'f']
 * pop --> f b a d c
 *
 * for cycle detection use visited array -> 0 : unvisited, 1: in-process, 2: finished
 *
 *
 */
class Solution {
    buildOrder(projects, dependencies) {
        if (projects.length == 0)
            return [];
        const adjList = new Map();
        this.buildGraph(projects, dependencies, adjList);
        return this.buildOrderWithGraphDFS(adjList);
    }
    buildGraph(projects, dependencies, adjList) {
        // build graph with adjacency list
        for (let edge of dependencies) {
            if (adjList.has(edge[0])) {
                const list = adjList.get(edge[0]);
                if (list) {
                    list?.push(edge[1]);
                    adjList.set(edge[0], list);
                }
            }
            else {
                adjList.set(edge[0], [edge[1]]);
            }
        }
        // add if there are any vertices with no edges
        for (let node of projects) {
            if (!adjList.has(node)) {
                adjList.set(node, []);
            }
        }
    }
    buildOrderWithGraphDFS(adjList) {
        // 0->unvisited, 1->in-process, 2->finished
        let visited = new Map();
        let stack = [];
        let result = [];
        let cycleDetected = { value: false };
        // initialize visited map
        for (let node of adjList.keys()) {
            visited.set(node, 0);
        }
        for (let node of adjList.keys()) {
            this.DFS(node, visited, adjList, stack, cycleDetected);
        }
        if (cycleDetected.value == true)
            return [];
        while (stack.length) {
            const node = stack.pop();
            if (node)
                result.push(node);
        }
        return result;
    }
    DFS(node, visited, adjList, stack, cycleDetected) {
        // base case
        if (visited.get(node) == 2)
            return;
        if (cycleDetected.value == true)
            return;
        // operation
        if (visited.get(node) == 0) {
            visited.set(node, 1);
        }
        else if (visited.get(node) == 1) {
            // cycle detected
            console.error('Cycle detected');
            // clear stack
            cycleDetected.value = true;
            return;
        }
        // recursion
        if (adjList.has(node)) {
            const edges = adjList.get(node);
            if (edges) {
                for (let edge of edges) {
                    this.DFS(edge, visited, adjList, stack, cycleDetected);
                }
            }
        }
        // mark as finished
        visited.set(node, 2);
        // add to stack
        stack.push(node);
    }
}
const solution1 = new Solution();
console.log("Example 1 - Expected: [f,e,a,b,d,c], Got:", solution1.buildOrder(["a", "b", "c", "d", "e", "f"], [["a", "d"], ["f", "b"], ["b", "d"], ["f", "a"], ["d", "c"]]));
const solution2 = new Solution();
console.log("Example 2 - Expected: Error, Got:", solution2.buildOrder(["a", "b"], [["a", "b"], ["b", "a"]]));
