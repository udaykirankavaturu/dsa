#include <iostream>
using namespace std;

int factorial(int num){
    // base case
    if(num == 1){
        return 1;
    }

    // recursive case
    int small_answer = factorial(num-1);

    // operation
    int big_answer = num * small_answer;

    return big_answer;
}

int main(){
    int result = factorial(6);
    cout<<"result: "<<result<<endl;
}