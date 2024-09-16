#include <iostream>
#include <vector>
#include<queue>
using namespace std;

class Graph{
    private:
        int vertexCount;
        vector<vector<int> > list;

        void DFTHelper(int vertex, vector<bool>& visited){
            visited[vertex] = true;
            cout<<"visited-->"<<vertex<<endl;

            for(int i=0;i<list[vertex].size();i++){
                int v = list[vertex][i];
                if(!visited[v]){
                    DFTHelper(v, visited);
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

        void DFT(){
            cout<<"depth first traversal"<<endl;
            int startVertex = 2;
            vector<bool> visited(vertexCount, false);

            DFTHelper(startVertex, visited);
            cout<<endl;
        }

        void BFT(){
            cout<<"breadth first traversal"<<endl;
            int startVertex = 2;
            vector<bool> visited(vertexCount, false);

            queue<int> q;
            q.push(startVertex);
            visited[startVertex] = true;

            while(!q.empty()){
                int front = q.front();
                cout<<"visited-->"<<front<<endl;
                q.pop();

                for(int i=0;i<list[front].size();i++){
                    int v = list[front][i];
                    if(!visited[v]){
                        visited[v] = true;
                        q.push(v);
                    }
                }
            }
            cout<<endl;
        }

};

int main(){ 
    Graph g;
    g.addVertex();
    g.addVertex();
    g.addVertex();
    g.addVertex();
    g.printGraph();

    g.addEdge(0,1);
    g.addEdge(0,2);
    g.addEdge(2,3);
    g.printGraph();

    g.DFT();
    g.BFT();
  
}