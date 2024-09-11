#include <iostream>
#include <vector>
using namespace std;



class Graph{
    private:
        int vertexCount;
        vector<vector<int> > list;

    public:
        Graph(){
            vertexCount=0;
        }

        void addVertex(){
            vertexCount++;
            list.push_back(vector<int>());
        }

        void addEdge(int u, int v){
            if(u >= vertexCount || v >= vertexCount){
                cout<<"invalid input"<<endl;
                return;
            }

            list[u].push_back(v);
            list[v].push_back(u);
        }

        void printGraph(){
            cout<<endl; 
            for(int i=0;i<vertexCount;i++){
                cout<<i<<" -->";
                for(int j=0;j<list[i].size();j++){
                    cout<<list[i][j]<<" ";
                }
                cout<<endl;
            }
        }
};

int main(){
    Graph g;
    g.addVertex();
    g.addVertex();
    g.addVertex();

    g.printGraph();

    g.addEdge(0,1);
    g.printGraph();
    g.addEdge(1,2);
    g.printGraph();
}