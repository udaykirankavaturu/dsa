#include <iostream>
using namespace std;

int main(){
    // int a[1000000000];
    int* a = new int[100000000000000];
    cout<<"Done!";

    // clean up
    delete[] a;
    a = nullptr;
}