#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

class Graph{
    private:
        int vertexCount;
        vector<vector<int> > matrix;
    public:
        Graph(){
            vertexCount = 0;
        }

        void addVertex(){
            vertexCount++;

            matrix.push_back(vector<int>(vertexCount, 0));

            for(int i=0;i<vertexCount-1;i++){
                matrix[i].push_back(0);
            }
        }

        void addEdge(int u, int v){
            matrix[u][v] = 1;
            matrix[v][u] = 1;
        }

        void printGraph(){
            for(int i=0;i<vertexCount;i++){
                for(int j=0;j<vertexCount;j++){
                    cout<<matrix[i][j];
                }
                cout<<endl;
            }
            cout<<endl;
        }
};

int main(){
    Graph g;
    g.addVertex();
    g.addVertex();
    g.addVertex();
    g.printGraph();

    g.addEdge(0,1);
    g.addEdge(0,2);
    g.printGraph();
}   