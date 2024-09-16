#include <iostream>
using namespace std;
#include <vector>

class MinHeap {
private:
    vector<int> heap;

    // Helper function to get parent index
    int parent(int i) { return (i - 1) / 2; }

    // Helper function to get left child index
    int left(int i) { return 2 * i + 1; }

    // Helper function to get right child index
    int right(int i) { return 2 * i + 2; }

    // Function to heapify up
    void heapifyUp(int i) {
        if (i && heap[parent(i)] > heap[i]) {
            swap(heap[i], heap[parent(i)]);
            heapifyUp(parent(i));
        }
    }

    // Function to heapify down
    void heapifyDown(int i) {
        int leftChild = left(i);
        int rightChild = right(i);
        int smallest = i;

        if (leftChild < heap.size() && heap[leftChild] < heap[smallest])
            smallest = leftChild;

        if (rightChild < heap.size() && heap[rightChild] < heap[smallest])
            smallest = rightChild;

        if (smallest != i) {
            swap(heap[i], heap[smallest]);
            heapifyDown(smallest);
        }
    }

public:
    // Function to insert an element into the heap
    void insert(int key) {
        heap.push_back(key);
        int index = heap.size() - 1;
        heapifyUp(index);
    }

    // Function to get the minimum element (root of the heap)
    int getMin() {
        if (heap.size() == 0)
            throw out_of_range("Heap is empty");
        return heap[0];
    }

    // Function to remove and return the minimum element
    void removeMin() {
        if (heap.size() == 0)
            throw out_of_range("Heap is empty");

        heap[0] = heap.back();
        heap.pop_back();
        heapifyDown(0);
    }

    // Function to print the heap
    void printHeap() {
        for (int i : heap)
            cout << i << " ";
        cout << endl;
    }
};

int main() {
    MinHeap h;
    h.insert(3);
    h.insert(2);
    h.insert(15);
    h.insert(5);
    h.insert(4);
    h.insert(45);

    cout << "Min Heap: ";
    h.printHeap();

    cout << "Minimum element: " << h.getMin() << endl;

    h.removeMin();
    cout << "Min Heap after removing minimum: ";
    h.printHeap();

    int i = -1;
    if(i){
        cout<<"inside"<<endl;
    }

    return 0;
}
