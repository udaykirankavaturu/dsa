#include <iostream>
#include <queue>
#include <vector>
#include <utility>
#include <climits>
using namespace std;

class MinHeap {
    private:
        vector<pair<int, int> > heap;

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
        void insert(pair<int, int> edge) {
            heap.push_back(edge);
            int index = heap.size() - 1;
            heapifyUp(index);
        }

        // Function to get the minimum element (root of the heap)
        pair<int, int> getMin() {
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
            for (const auto& i : heap)
                cout << i.first << " "<<i.second<<" ";
            cout << endl;
        }

        // Function to check if heap is empty
        bool isEmpty(){
            return heap.size() == 0;
        }
};

class Graph{
    private:
        int vertexCount;
        vector<vector<pair<int, int> > > list;
    public:
        Graph(){
            vertexCount = 0;
        }

        void addVertex(){
            vertexCount++;

            list.push_back(vector<pair<int, int>>());
        }

        void addEdge(int u, int v, int w){
            list[u].push_back(make_pair(v,w));
            list[v].push_back(make_pair(u,w));
        }

        void printGraph(){
            for(int i=0;i<vertexCount;i++){
                cout<<i<<"--> ";
                for(int j=0; j< list[i].size();j++){
                    cout<<list[i][j].first<<"-"<<list[i][j].second<<" | ";
                }
                cout<<endl;
            }
            cout<<endl;
        }

        void dijkstra(int startVertex){
            vector<bool> visited(vertexCount, false);
            vector<int> dist(vertexCount, INT_MAX);
            dist[startVertex] = 0;

            MinHeap mh;
            mh.insert(make_pair(startVertex, 0));

            while(!mh.isEmpty()){
                pair<int, int> min = mh.getMin();
                mh.removeMin();

                int currentVertex = min.first;
                int currentWeight = min.second;

                if(!visited[currentVertex]){
                    visited[currentVertex] = true;

                    for(const auto& neighbor : list[currentVertex]){
                        int neighborVertex = neighbor.first;
                        int neighborWeight = neighbor.second;

                        if((currentWeight + neighborWeight) < dist[neighborVertex]){
                            dist[neighborVertex] = (currentWeight + neighborWeight);
                            mh.insert(make_pair(neighborVertex, dist[neighborVertex]));
                        }

                    }
                }
            }

            for(int i=0;i<dist.size();i++){
                cout<<"shortest distance to reach "<<i<<" is "<<dist[i]<<endl;
            }
        }
};

int main() {
    Graph g;
    g.addVertex();
    g.addVertex();
    g.addVertex();
    g.addVertex();

    g.addEdge(0,1,5);
    g.addEdge(0,2,10);
    g.addEdge(2,3,5);
    g.addEdge(0,3,20);
    g.printGraph();

    g.dijkstra(1);

    return 0;
}
