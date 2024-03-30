#include <iostream>
using namespace std;

int main() {
    int a[] = {8,6,7,5,3,4,1,2};
    int size = 8;

    cout<<"before sorting:"<<endl;
    for(int i=0;i<size;i++){
        cout<<a[i]<<" ";
    }

    // bubble sort
    for(int i=0;i<size-1;i++){
        for(int j=0;j<size-1;j++){
            if(a[j] > a[j+1]){
                // swap
                int temp = a[j];
                a[j] = a[j+1];
                a[j+1] = temp;
            }
        }
    }
    cout<<endl;
    
    cout<<"after sorting:"<<endl;
    for(int i=0;i<size;i++){
        cout<<a[i]<<" ";
    }
}
