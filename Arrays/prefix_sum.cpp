#include <iostream>
#include <vector>
using namespace std;

int main(){

    vector<int> v;
    v.push_back(10);
    v.push_back(20);
    v.push_back(30);
    v.push_back(40);
    v.push_back(50);

    vector<int> prefix_sum; // {10, 30, 60, 100, 150}
    prefix_sum.push_back(v[0]);
    for(int i=1; i< v.size(); i++){
        prefix_sum.push_back(prefix_sum[i-1] + v[i]);
    }

    for(int j=0; j< prefix_sum.size(); j++){
        cout<<prefix_sum[j]<<endl;
    }

    // sum of first three elements
    cout<<"sum of first three elements: "<<prefix_sum[2]<<endl;
    cout<<"sum of first four elements: "<<prefix_sum[3]<<endl;
    cout<<"sum of first five elements: "<<prefix_sum[4]<<endl;

    // sum of elements from 2-4 m,n
    int result = prefix_sum[n] - prefix_sum[m-1];
    cout<<"result is: "<<result<<endl;

}