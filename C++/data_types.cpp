#include <iostream>
using namespace std;

int main(){
  cout<<"Size of int is : "<<sizeof(int)<<endl;
  cout<<"Size of char is:"<<sizeof(char)<<endl;
  cout<<"Size of float is:"<<sizeof(float)<<endl;
  cout<<"Size of double is:"<<sizeof(double)<<endl;

  int a = 10;
  char c = 'Z';
  float f = 2.54;
  double d = 3.445555;

  int *ptr = &a;

  cout<<"value of a is: "<<a<<endl;
  cout<<"value of c is: "<<c<<endl;
  cout<<"value of f is: "<<f<<endl;
  cout<<"value of d is: "<<d<<endl;
  cout<<"value of ptr is: "<<ptr<<endl;

}