"use strict";
// binary tree as array
// min heap
class MinHeapPractice {
    heap = [];
    size() {
        return this.heap.length;
    }
    isEmpty() {
        return this.heap.length === 0;
    }
    insert(value) {
        if (this.isEmpty()) {
            this.heap.push(value);
            return;
        }
        // push at the end and heapify up
        this.heap.push(value);
        this.heapifyUp(this.size() - 1);
    }
    heapifyUp(index) {
        // compare with parent
        let currentIndex = index;
        while (currentIndex > 0) {
            // get parent
            const parentIndex = this.getParentIndex(currentIndex);
            if (this.heap[currentIndex] < this.heap[parentIndex]) {
                this.swap(currentIndex, parentIndex);
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
        if (this.isEmpty())
            return;
        // get root element
        const root = this.heap[0];
        // swap root with last element
        this.heap[0] = this.heap[this.size() - 1];
        // clean up last node
        this.heap.pop();
        // heapify down
        this.heapifyDown(0);
    }
    heapifyDown(index) {
        let currentIndex = index;
        while (true) {
            let smallest = currentIndex;
            // check if left child is smaller
            let leftChildIndex = this.getLeftChildIndex(currentIndex);
            if (leftChildIndex < this.size() && this.heap[leftChildIndex] < this.heap[currentIndex]) {
                smallest = leftChildIndex;
            }
            // check if right child is smaller
            let rightChildIndex = this.getRightChildIndex(currentIndex);
            if (rightChildIndex < this.size() && this.heap[rightChildIndex] < this.heap[currentIndex]) {
                smallest = rightChildIndex;
            }
            // swap if needed
            if (smallest != currentIndex) {
                this.swap(currentIndex, smallest);
                currentIndex = smallest;
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
    print() {
        console.log(this.heap);
    }
}
let mh = new MinHeapPractice();
mh.insert(5);
mh.print();
mh.insert(3);
mh.print();
mh.insert(8);
mh.print();
mh.insert(1);
mh.print();
// removes
mh.remove();
mh.print();
mh.remove();
mh.print();
mh.remove();
mh.print();
mh.remove();
mh.print();
