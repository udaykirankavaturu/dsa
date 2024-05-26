#include <iostream>
using namespace std;

template <typename L, typename K>
class A{
    private:
        L x;
        K y;
    public:
        void setx(L x){
            this->x = x;
        }

        L getx(){
            return this->x;
        }

        void sety(K y){
            this->y=y;
        }

        K gety(){
            return this->y;
        }
};

int main(){
    A<char, int> a;
    a.setx('g');
    cout<<a.getx()<<endl;

    a.sety(5);
    cout<<a.gety();
}