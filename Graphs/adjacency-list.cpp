#include <iostream>
#include <vector>
#include<queue>
using namespace std;

class Graph{
    private:
        int vertexCount;
        vector<vector<int> > list;

        void DSTHelper(int vertex, vector<bool>& visited){
            cout<<vertex<<" visited"<<endl;
            visited[vertex] = true;

            for(int i=0;i<list[vertex].size();i++){
                int v = list[vertex][i];
                if(visited[v] == false){
                    DSTHelper(v, visited);
                }
            }
        }
    public:
        Graph(){
            vertexCount = 0;
        }

        void addVertex(){
            vertexCount++;

            list.push_back(vector<int>());
        }

        void addEdge(int u, int v){
            list[u].push_back(v);
            list[v].push_back(u);
        }

        void printGraph(){
            for(int i=0;i<vertexCount;i++){
                cout<<i<<"-->";
                for(int j=0; j< list[i].size();j++){
                    cout<<list[i][j];
                }
                cout<<endl;
            }
            cout<<endl;
        }

        void BST(){
            cout<<"Breadth First Traversal"<<endl;
            int startVertex = 2;
            vector<bool> visited(vertexCount,false);
            queue<int> q;

            visited[startVertex] = true;
            q.push(startVertex);

            while(!q.empty()){
                int vertex = q.front();
                cout<<vertex<<" visited"<<endl;
                q.pop();

                for(int i=0;i<list[vertex].size();i++){
                    int v = list[vertex][i];
                    if(visited[v] == false){
                        visited[v] = true;
                        q.push(v);
                    }
                }
            }

        }

        void DST(){
            cout<<"Depth First Traversal"<<endl;
            int startVertex = 0;
            vector<bool> visited(vertexCount,false);
            DSTHelper(startVertex, visited);
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

    g.BST();
    g.DST();
  
}