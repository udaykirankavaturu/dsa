#include <iostream>
#include <vector>
using namespace std;

int main(){
    vector<int> v; 
    v.push_back(0);
    v.push_back(1);
    v.push_back(1);
    v.push_back(1);
    v.push_back(1);
    v.push_back(1);
    v.push_back(1);
    v.push_back(1);
    v.push_back(0);
    v.push_back(1);

    // initialise window
    int w_start = 0;
    int w_end = 0;
    int current_streak = 0;
    int max_streak = 0;

    // slide
    while(w_end < v.size()){

        if(v[w_end] == 1){
            current_streak++;
            if(current_streak > max_streak){
                max_streak =  current_streak;
            }
        }
        
        // shrink window
        if(v[w_end] == 0){
            current_streak = 0;
            w_start = w_end;
        }


        w_end++;
    }

    cout<<"Max streak is:"<<max_streak<<endl;

}