#include <iostream>
using namespace std;

int main(){
    int a[5] = {1,2,1,3,6};
    int hash[7] = {0};

    for(int i=0;i<5;i++){
        hash[a[i]]++;
    }

    for(int i=0;i<7;i++){
        cout<<hash[i]<<" ";
    }
    cout<<endl;
    cout<<"1 appears "<<hash[1]<<" times"<<endl;
    cout<<"2 appears "<<hash[2]<<" times"<<endl;

}