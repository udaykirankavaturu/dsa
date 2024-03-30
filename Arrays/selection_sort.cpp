#include <iostream>
using namespace std;

int main(){
    int a[] = {8,7,5,6,3,4,1,2};
    int size = 8;

    cout<<"before sorting:"<<endl;
    for(int i=0;i<size;i++){
        cout<<a[i]<<" ";
    }

    // selection sort
    for(int i=0;i<size;i++){
        int min_index = i;
        for(int j=i+1; j<size;j++){
            if(a[j] < a[min_index]){
                min_index = j;
            }
        }
        // swap
        if(min_index != i){
            int temp = a[i];
            a[i] = a[min_index];
            a[min_index] = temp;
        }
    }


    cout<<endl;
    cout<<"after sorting:"<<endl;
    for(int i=0;i<size;i++){
        cout<<a[i]<<" ";
    }

}