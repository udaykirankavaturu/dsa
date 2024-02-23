#include <iostream>
using namespace std;

int main(){
    // Arithmetic operators
    // + - * / %
    int a = 55;
    int b = 4;
    cout<<"Addition:"<<(a+b)<<endl;
    cout<<"Subtraction:"<<(b-a)<<endl;
    cout<<"Multiplication:"<<(b*a)<<endl;
    cout<<"Division of a/b:"<<(a/b)<<endl;
    cout<<"Division of b/a:"<<(b/a)<<endl;
    cout<<"Modulus of a % b:"<<(a % b)<<endl;


    // Relational operators
    // < <= > >= ==
    cout<<"a<b:"<<(a<b)<<endl;
    a = 18;
    b = 20;
    cout<<"a<=b:"<<(a<=b)<<endl;

    a = 20;
    b = 18;
    cout<<"a>b:"<<(a>b)<<endl;

    cout<<"a>=b:"<<(a>=b)<<endl;
    a = 2;
    b = 2;
    cout<<"a==b:"<<(a==b)<<endl;


    // Logical operators
    // && || !=
     a = 20;
     b = 20;
    int c = 5;
    int d = 10;

    cout<<"&&: "<<((a<b)&&(c<d))<<endl;
    cout<<"||: "<<((a<b)||(c<d))<<endl;

    cout<<"!= :"<<(a!=b)<<endl;

    // Assignment operators
    // = += -= *= /=
    a = 10;
    // a += 2;
    // a = a + 2;
    // a -= 2;
    // a = a - 2;
    // a *= 2;
    a /= 2;
    cout<<"a: "<<a<<endl;
}