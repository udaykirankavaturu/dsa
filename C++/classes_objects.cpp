#include <iostream>
using namespace std;

int main(){
    class Student{
        private:
            int roll_number;
            int age;

        public:
            void print(){
                cout<<this->roll_number<<endl;
                cout<<this->age<<endl;
            }

            // getter methods
            int getAge(){
                return this->age;
            }

            int getRollNumber(){
                return this->roll_number;
            }

            // setter methods
            int setAge(int age){
                if(age<0){
                    return -1;
                }
                this->age = age;
                return 1;
            }

            void setRollNumber(int roll_number){
                this->roll_number = roll_number;
            }
    };

    Student uday;
    uday.setAge(10);
    uday.setRollNumber(1);
    int age = uday.getAge();
    int roll_number = uday.getRollNumber();
    cout<<"age is:"<<age<<endl;
    cout<<"roll number is:"<<roll_number<<endl;
    uday.print();

}