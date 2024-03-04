#include <iostream>
using namespace std;

int main(){
    int a[5] = {1,2,3,4,5};
    int i = 0;
    int j = 4;

    // before
    cout<<"before"<<endl;
    for(int i=0; i<5;i++){
        cout<<a[i];
    }

    while(i<j){
        // swap
        int temp = a[i];
        a[i] = a[j];
        a[j] = temp;

        i++;
        j--;
    }

    // after reverse
    cout<<"after"<<endl;
    for(int i=0; i<5;i++){
        cout<<a[i];
    }
}