#include <iostream>
#include <vector>
using namespace std;

int main(){

    vector<int> v;
    v.push_back(20);
    v.push_back(10);
    v.push_back(13);
    v.push_back(7);
    v.push_back(9);
    v.push_back(3);

    int w_size = 3;
    int w_gold = 0;
    int max_gold = 0;

    // first window
    for(int i = 0; i< w_size; i++){
        w_gold = w_gold + v[i];
    }

    max_gold = w_gold;

    // initiate window
    int w_start = 1;
    int w_end = w_start + w_size - 1;

    // slide window
    while(w_end < v.size()){

        w_gold = w_gold - v[w_start - 1] + v[w_end];

        // update max_gold
        if(w_gold > max_gold){
            max_gold = w_gold;
        }

        w_start++;
        w_end++;
    }

    cout<<"Max gold is:"<<max_gold<<endl;

}