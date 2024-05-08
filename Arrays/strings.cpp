#include<iostream>
#include<string>
using namespace std;

int main(){
    // create
    string s1 = "hello";

    // read
    cout<<"first char "<<s1[0]<<endl;

    // iterate
    for(char c: s1){
        cout<<c<<endl;
    }

    // update
    s1[0] = 'p';
    cout<<s1<<endl;

    // replace part of string
    s1.replace(0,5,"world");
    cout<<s1<<endl;

    // insert into string
    s1.insert(2," uday ");
    cout<<s1<<endl;

    // concatenate
    string s2 = "abcd";
    string s3 = s1+s2;
    cout<<"s3"<<s3<<endl;

    // remove
    s1.clear();
    cout<<"s1 after clear:"<<s1<<endl;

    // erase
    s3.erase(3,4);
    cout<<"s3"<<s3<<endl;

    // find
    string s4 = "hello world";
    cout<<s4.find("l")<<endl;

    // rfind
    cout<<s4.rfind("l")<<endl;

    // size
    cout<<s4.size()<<endl;


}