#include <iostream>
using namespace std;

int left(int index){
    return index*2 + 1;
}

int right(int index){
    return index*2 + 2;
}

int parent(int index){
    return (index - 1) / 2;
}

int main(){
   int a[7];
   a[0] = 1;
   a[1] = 2;
   a[2] = 3;
   a[3] = 4;
   a[4] = 5;
   a[5] = 6;
   a[6] = 7;

   cout<<"left child of 1 is:"<<a[left(0)]<<endl;
   cout<<"right child of 1 is:"<<a[right(0)]<<endl;
   cout<<"parent of 5 is:"<<a[parent(4)]<<endl;

}