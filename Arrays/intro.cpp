#include <iostream>
using namespace std;

int main(){
    // create an array
    int a[5];

    // access elements
    cout<<a[0]<<endl;
    cout<<a[1]<<endl;

    // initiliase array
    int b[5] = {1,2,3,4,5};

    // insert into array
    a[0] = 1;
    a[1] = 2;
    a[2] = 3;
    a[3] = 4;
    a[4] = 5;

    // access elements
    cout<<a[0]<<endl;
    cout<<a[1]<<endl;

    // update array
    a[0] = 10;
    a[1] = 20;

    // access elements
    cout<<a[0]<<endl;
    cout<<a[1]<<endl;

    // default to 0 (partial initialization)
    int c[5] = {1,2};
    cout<<c[0]<<endl;
    cout<<c[1]<<endl;
    cout<<c[2]<<endl;
    cout<<c[3]<<endl;
    cout<<c[4]<<endl;

    for(int i=0; i<5; i++){
        c[i] = c[i+1];
    }

    cout<<"after deleting first element"<<endl;
    for(int i=0; i<5; i++){
        cout<<c[i]<<endl;
    }

}