#include <iostream>
using namespace std;

class DisjointSet{
    private:
        vector<int> parent;
        vector<int> size;
    public:
        DisjointSet(int n){
            parent.resize(n);
            size.resize(n, 1);

            for(int i=0;i<n;i++){
                parent[i] = i;
            }
        }

        int find(int x){
            if(parent[x] != x){
                parent[x] = find(parent[x]);
            }

            return parent[x];
        }

        void unionSet(int x, int y){
            int rootX = find(x);
            int rootY = find(y);

            if(rootX != rootY){
                if(size[rootX] < size[rootY]){
                    parent[x] = rootY;
                    size[rootY] += size[rootX];
                } else {
                    parent[y] = rootX;
                    size[rootX] += size[rootY];
                }
            }
        }
};

class Edge {
    public:
        int u;
        int v;
        int weight;

        Edge(int u, int v, int weight){
            this->u = u;
            this->v = v;
            this->weight = weight;
        }
};

int main(){
    vector<Edge> edges = {
        Edge(0,1,2),
        Edge(0,2,7),
        Edge(2,3,5),
        Edge(3,5,3),
        Edge(4,5,4),
        Edge(2,4,6)
    };

    sort(edges.begin(), edges.end(), [](Edge a, Edge b){return a.weight < b.weight;});
    DisjointSet ds(edges.size());
    vector<Edge> MST;

    for(const auto& edge : edges){

        int rootU = ds.find(edge.u);
        int rootV = ds.find(edge.v);

        if(rootU != rootV){
            MST.push_back(edge);
        }

        ds.unionSet(edge.u, edge.v);
    }

    for(const auto& edge: MST){
        cout<<"("<<edge.u<<","<<edge.v<<","<<edge.weight<<")"<<endl;
    }
} 