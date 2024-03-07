#include <iostream>
#include <vector>
using namespace std;

int main(){
    vector<int> v;
    for(int i=0;i<10;i++){
        v.push_back(i);
        // cout<<i+1<<endl;
        // cout<<"size: "<<v.size()<<endl;
        // cout<<"capacity: "<<v.capacity()<<endl;
    }

    // read
    cout<<"v.at():"<<v.at(2)<<endl;
    cout<<"v[2]:"<<v[2]<<endl;

    // update
    v[2] = 20;

       // read
    cout<<"v.at():"<<v.at(2)<<endl;
    cout<<"v[2]:"<<v[2]<<endl;

    // remove
    cout<<"before pop"<<endl;
    for(int i=0; i< v.size(); i++){
        cout<<v.at(i);
    }
    v.pop_back();
    cout<<"after pop"<<endl;
    for(int i=0; i< v.size(); i++){
        cout<<v.at(i);
    }

}