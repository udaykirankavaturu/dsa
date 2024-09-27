#include <iostream>
#include <vector>
#include <queue>
#include <stack>
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

        void topologicalHelper(int index, vector<bool>& visited, stack<int>& topologicalStack){
            visited[index] =  true;

            for(const auto& edge : list[index]){
                if(!visited[edge]){
                    topologicalHelper(edge, visited, topologicalStack);
                }
            }

            topologicalStack.push(index);
        }

        void topologicalSort(){
            vector<bool> visited(vertexCount, false);
            stack<int> topologicalStack;

            for(int i=0;i<list.size();i++){
                if(!visited[i]){
                    topologicalHelper(i,visited, topologicalStack);
                }
            }

            while(!topologicalStack.empty()){
                int top = topologicalStack.top();
                topologicalStack.pop();
                cout<<top<<"->";
            }

        }

};

int main(){ 
    Graph g;
    g.addVertex();
    g.addVertex();
    g.addVertex();
    g.addVertex();
     g.addVertex();
    g.addVertex();
    g.addVertex();
    g.addVertex();
    g.addVertex();

    g.addEdge(0,1);
    g.addEdge(0,2);
    
    g.addEdge(1,3);
    g.addEdge(1,6);
    g.addEdge(1,7);

    g.addEdge(3,4);
    g.addEdge(3,8);

    g.addEdge(4,5);

    g.addEdge(6,8);



    g.printGraph();

    g.topologicalSort();

  
}