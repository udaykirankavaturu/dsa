#include <iostream>
using namespace std;

int main(){
    int num1 = 5;
    int num2 = 3;

    //   bitwise AND
    int result = num1 & num2;
    cout<<"5 & 3: "<< result <<endl;

    //   bitwise OR
    result = num1 | num2;
    cout<<"5 | 3: "<< result <<endl;

    // bitwise XOR
    result = num1 ^ num2;
    cout<<"5 ^ 3: "<< result <<endl;

    // bitwise left shift
    result = num1 << 1;
    cout<<"left shift 5 by 1 bit: "<< result << endl;

    // bitwise right shift
    result = num1 >> 1;
    cout<<"right shift 5 by 1 bit: "<< result << endl;
}