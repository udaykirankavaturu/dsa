#include <iostream>
using namespace std;

// pass by reference
int add(int *c, int *d){ 
    *c = *c + 10;
    *d = *d + 10;
    return *c + *d;
}

// pass by value
int add(int c, int d){ 
    c = c + 10;
    cout<<"c is: "<<c<<endl;
    return c + d;
}

// function overloading
int add(int c, int d, int e){ 
    return c + d + e;
}

int main(){
    int a = 10;
    int b = 20;
    int c = 30;
    int result = add(a,b);
    int result2 = add(a,b,c);
    int resultByRef = add(&a,&b);

    cout<<"Result is: "<<result<<endl;
    cout<<"Result2 is: "<<result2<<endl;
    cout<<"ResultByRef is: "<<resultByRef<<endl;
    cout<<"a is: "<<a<<endl;
    cout<<"b is: "<<b<<endl;

}