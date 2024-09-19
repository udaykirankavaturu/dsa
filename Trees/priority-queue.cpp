#include <iostream>
using namespace std;
#include <vector>
#include <utility>

class MinHeap {
private:
    vector<pair<string, int> > heap;

    // Helper function to get parent index
    int parent(int i) { return (i - 1) / 2; }

    // Helper function to get left child index
    int left(int i) { return 2 * i + 1; }

    // Helper function to get right child index
    int right(int i) { return 2 * i + 2; }

    // Function to heapify up
    void heapifyUp(int i) {
        if (i && heap[parent(i)].second > heap[i].second) {
            swap(heap[i], heap[parent(i)]);
            heapifyUp(parent(i));
        }
    }

    // Function to heapify down
    void heapifyDown(int i) {
        int leftChild = left(i);
        int rightChild = right(i);
        int smallest = i;

        if (leftChild < heap.size() && heap[leftChild].second < heap[smallest].second)
            smallest = leftChild;

        if (rightChild < heap.size() && heap[rightChild].second < heap[smallest].second)
            smallest = rightChild;

        if (smallest != i) {
            swap(heap[i], heap[smallest]);
            heapifyDown(smallest);
        }
    }

public:
    // Function to insert an element into the heap
    void insert(string name, int priority) {
        heap.push_back(make_pair(name, priority));
        int index = heap.size() - 1;
        heapifyUp(index);
    }

    // Function to get the minimum element (root of the heap)
    pair<string, int> getMin() {
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
        for (const pair<string, int> node : heap)
            cout << node.first << " "<<node.second<<" ";
        cout << endl;
    }
};

int main() {
    MinHeap mh;
    cout<<"inserts"<<endl;
    mh.insert("sam", 3);
    mh.printHeap();

    mh.insert("tom", 2);
    mh.printHeap();

    mh.insert("jerry", 1);
    mh.printHeap();

    mh.insert("barry", 1);
    mh.printHeap();

    cout<<"removals"<<endl;
    mh.removeMin();
    mh.printHeap();

    mh.removeMin();
    mh.printHeap();

    mh.removeMin();
    mh.printHeap();

    cout<<"next in queue: ";
    cout<<mh.getMin().first<<" "<<mh.getMin().second<<endl;

    return 0;
}
