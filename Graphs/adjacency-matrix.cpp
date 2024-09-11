#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

class Graph{
    private:
        int vertexCount;
        vector<vector<int> > matrix;
        unordered_map<int, string> map;
    public:
        Graph(){
            vertexCount = 0;
        }

        void addVertex(string name){
            vertexCount++;

            matrix.push_back(vector<int>(vertexCount, 0));

            for(int i=0;i<vertexCount-1;i++){
                matrix[i].push_back(0);
            }

            map[vertexCount-1] = name;
        }

        void addEdge(int u, int v){
            if(u >= vertexCount || v >= vertexCount){
                cout<<"invalid input"<<endl;
                return;
            } else {
                matrix[u][v] = 5;
                matrix[v][u] = 5;
            }
        }

        void printGraph(){
            cout<<"    ";
            for(int i=0;i<vertexCount;i++){
                cout<<map[i]<<" ";
            }
            cout<<endl;

            for(int i=0;i<vertexCount;i++){
                cout<<map[i]<<"  ";
                for(int j=0;j<vertexCount;j++){
                    cout<<matrix[i][j]<<" ";
                }
                cout<<endl;
            }

            cout<<endl;
        }
};

int main(){
    Graph g;
    g.addVertex("sam");
    g.addVertex("tom");
    g.addVertex("jerry");

    g.printGraph();

    g.addEdge(0,2);
    g.addEdge(0,1);
    g.printGraph();
}   