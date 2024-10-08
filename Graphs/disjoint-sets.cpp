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
                    size[rootX] += rootY;
                }
            }
        }
};

int main(){
   DisjointSet ds(7);
   ds.unionSet(0,1);
   ds.unionSet(0,2);
   ds.unionSet(2,3);
   ds.unionSet(4,5);
   ds.unionSet(4,6);
//    ds.unionSet(0,4);

   if(ds.find(0) == ds.find(6)){
    cout<<"friends"<<endl;
   } else {
    cout<<"not friends"<<endl;
   }

}