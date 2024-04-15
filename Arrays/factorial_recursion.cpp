#include <iostream>
using namespace std;

int factorial(int num){
    // base case
    if(num == 1) return 1;

    // recursive case
    int small_ans = factorial(num -1);

    // operation
    int big_ans = num * small_ans;

    return big_ans;
}

int main(){
    int result = factorial(6);
    cout<<"result "<<result<<endl;
}