#include <iostream>
#include <vector>
using namespace std;

// for printing the vector elements
void printVector(vector<int> &v){
    int i=0;
    while(i<v.size()){
        cout<<v[i]<<" ";
        i++;
    }
    cout<<endl;
}

// for comparing two sub vectors and sort them to the main vector
void merge(vector<int> &v, int left, int mid, int right){
    int temp_left_size = mid - left + 1;
    int temp_right_size = right - mid;
    vector<int> temp_left;
    vector<int> temp_right;
    int i = 0;
    while(i<temp_left_size){
        temp_left.push_back(v[left + i]);
        i++;
    } 

    i = 0;
    while(i<temp_right_size){
        temp_right.push_back(v[mid + 1 + i]);
        i++;
    } 

    int m =0, n=0, k=left;
    while(m<temp_left_size && n<temp_right_size){
        if(temp_left[m] <= temp_right[n]){
            v[k] = temp_left[m];
            m++;
        }
        else{
            v[k] = temp_right[n];
            n++;
        }

        k++;
    }

    while(m<temp_left_size){
        v[k] = temp_left[m];
        m++; k++;
    }

    while(n<temp_right_size){
        v[k] = temp_right[n];
        n++; k++;
    }

}

// divide and conquer 
void sort(vector<int> &v, int left, int right){
    if(left<right){
        int mid = left + (right-left) / 2; 
        sort(v, left, mid);
        sort(v, mid+1, right);
        merge(v, left, mid, right);
    }
    
}

void mergeSort(vector<int> &v){
    int left = 0;
    int right = v.size() - 1;
    sort(v, left, right);
}

int main(){
    vector<int> v;
    v.push_back(13);
    v.push_back(11);
    v.push_back(12);
    v.push_back(7);
    v.push_back(5);
    v.push_back(6);

    cout<<"before sorting"<<endl;
    printVector(v);

    mergeSort(v);

    cout<<"after sorting"<<endl;
    printVector(v);


}