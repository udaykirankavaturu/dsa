#include <iostream>
#include <unordered_map>
using namespace std;

int main(){
    unordered_map<string, int> fruits;

    // insert 
    fruits["apple"] = 10;
    fruits["banana"] = 20;
    fruits["guava"] = 30;
    fruits["mango"] = 40;

    // read
    cout<<fruits["apple"]<<endl;

    // update
    fruits["mango"] = 50;

    // iterate before remove
    cout<<"before remove"<<endl;
    for(const auto& pair: fruits){
        cout<<pair.first<<":"<<pair.second<<endl;
    }

    // remove
    fruits.erase("guava");

    // iterate
    // pair <first, second>
    // pair <key, value>
    cout<<"after remove"<<endl;
    for(const auto& pair: fruits){
        cout<<pair.first<<":"<<pair.second<<endl;
    }

}