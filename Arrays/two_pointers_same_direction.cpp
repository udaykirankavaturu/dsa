#include <iostream>
using namespace std;

int main(){
    int a[5] = {1,2,3,4,5};
    int r = 0;
    int t = 0;
    int rabbit_pace = 2;
    int tortoise_pace = 1;
    char winner;

    while(r<5 || t<5){
        if(r>=5){
            winner = 'r';
        }

        if(t>=5){
            winner = 't';
        }


        r = r + rabbit_pace;
        t =  t + tortoise_pace;
    }

    cout<<"Winner is: "<<winner<<endl;
}