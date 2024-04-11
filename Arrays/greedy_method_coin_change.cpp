#include <iostream>
#include <vector>
using namespace std;

int main(){
    vector<int> denominations;
    denominations.push_back(10);
    denominations.push_back(5);
    denominations.push_back(2);
    denominations.push_back(1);
    int amount = 35; 
    int coins = 0; 
    vector<int> coins_used; 

    // start using coins from the highest possible denomination
    for(int i=0;i<denominations.size();i++){
        // continue using that coin until it is less than the target amount
        while(denominations[i]<=amount){
            amount -= denominations[i];
            coins++;
            coins_used.push_back(denominations[i]);
        }

        if(amount<=0){
            break;
        }
    }

    cout<<"coins:"<<coins<<endl;
    cout<<"coins used:"<<endl;
    for(int i=0;i<coins_used.size();i++){
        cout<<coins_used[i]<<" "<<endl;
    }
}