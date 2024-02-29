#include <iostream>
using namespace std;

int main() {
  class Student{
    private:
        int roll_number;
        int age;
    public:
        Student(){
            cout<<"constructor1 called"<<endl;
        }

        Student(int roll_number, int age){
            this->roll_number = roll_number;
            this->age = age;
            cout<<"constructor2 called"<<endl;
        }

        void setAge(int age){
            this->age =  age;
        }

        int getAge(){
            return this->age;
        }

        ~Student(){
            cout<<"destructor called"<<endl;
        }
  };

//   Student uday;
//   uday.setAge(10);
//   int age = uday.getAge();
//   cout<<"age is "<<age<<endl;

  Student sam(2,11);
}
