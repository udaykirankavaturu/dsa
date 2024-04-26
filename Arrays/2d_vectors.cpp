#include <iostream>
#include <vector>
using namespace std;

void print2DVector(vector<vector<int>>& v){
    cout<<"start"<<endl;
    for(int i=0;i<v.size();i++){
        for(int j=0;j<v[i].size();j++){
            cout<<v[i][j]<<" ";
        }
        cout<<endl;
    }
    cout<<"end"<<endl;
}

int main(){
    // create
    vector<vector<int>> v;
    v.push_back({1,2,3});
    v.push_back({4,5,6});
    v.push_back({7,8,9});

    // read or access  
    print2DVector(v);

    // update an element
    v[2][2] = 10;

    print2DVector(v);

    // remove an element
    v[1].erase(v[1].begin() + 1);

    print2DVector(v);
}