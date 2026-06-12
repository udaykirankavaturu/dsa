"use strict";
/**
 * Given an integer array nums and an integer k, return the kth largest element in the array.

Note that it is the kth largest element in the sorted order, not the kth distinct element.

Can you solve it without sorting?

 

Example 1:

Input: nums = [3,2,1,5,6,4], k = 2
Output: 5

Example 2:

Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4

 */
/**
 * approach - use max heap datastructure
 * insert - O(log n) per insert
 * remove - O(log n) * k per removal
 */
class MaxHeap {
    heap = [];
    isEmpty() {
        return this.heap.length === 0;
    }
    size() {
        return this.heap.length;
    }
    insert(value) {
        // if empty
        if (this.isEmpty()) {
            this.heap.push(value);
            return;
        }
        // else add to end of heap and heapify up
        this.heap.push(value);
        this.heapifyUp(this.size() - 1);
    }
    heapifyUp(index) {
        let currentIndex = index;
        while (currentIndex > 0) {
            // get parent index
            const parentIndex = this.getParentIndex(currentIndex);
            if (this.heap[parentIndex] < this.heap[currentIndex]) {
                this.swap(parentIndex, currentIndex);
                currentIndex = parentIndex;
            }
            else {
                break;
            }
        }
    }
    getParentIndex(index) {
        return Math.floor((index - 1) / 2);
    }
    swap(firstIndex, secondIndex) {
        [this.heap[firstIndex], this.heap[secondIndex]] = [this.heap[secondIndex], this.heap[firstIndex]];
    }
    remove() {
        // if empty, return
        if (this.isEmpty())
            return;
        // get max element
        let maxElement = this.heap[0];
        // copy last element to front
        this.heap[0] = this.heap[this.size() - 1];
        // pop last element
        this.heap.pop();
        // heapify down to bubble up the max element
        this.heapifyDown(0);
        return maxElement;
    }
    heapifyDown(index) {
        let currentIndex = index;
        let largestIndex = currentIndex;
        while (true) {
            // check if left child is bigger
            let leftChildIndex = this.getLeftChildIndex(currentIndex);
            if (leftChildIndex < this.size() && this.heap[leftChildIndex] > this.heap[largestIndex]) {
                largestIndex = leftChildIndex;
            }
            // check if right child is bigger
            let rightChildIndex = this.getRightChildIndex(currentIndex);
            if (rightChildIndex < this.size() && this.heap[rightChildIndex] > this.heap[largestIndex]) {
                largestIndex = rightChildIndex;
            }
            if (largestIndex != currentIndex) {
                this.swap(largestIndex, currentIndex);
                currentIndex = largestIndex;
            }
            else {
                break;
            }
        }
    }
    getLeftChildIndex(index) {
        return index * 2 + 1;
    }
    getRightChildIndex(index) {
        return index * 2 + 2;
    }
    peek() {
        return this.size() ? this.heap[0] : null;
    }
    print() {
        console.log(this.heap);
    }
}
function kthLargestElement(nums, k) {
    const mh = new MaxHeap();
    for (const num of nums) {
        mh.insert(num);
    }
    while (k > 1) {
        mh.remove();
        k--;
    }
    console.log('output is ', mh.peek());
}
kthLargestElement([3, 2, 1, 5, 6, 4], 2);
kthLargestElement([3, 2, 3, 1, 2, 4, 5, 5, 6], 4);
