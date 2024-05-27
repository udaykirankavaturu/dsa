#include <iostream>
using namespace std;

template <typename T>
class Node{
    public:
        T value;
        Node* next;

        Node(T value){
            this->value = value;
            this->next = nullptr;
        }
};

template <typename T>
class Stack{
    private:
        Node<T>* head;
        int size;

    public:
        Stack(){
            this->head = nullptr;
            this->size = 0;
        }

        void push(T value){
            Node<T>* new_node = new Node<T>(value);

            if(this->head == nullptr){
                this->head = new_node;
                size++;
                return;
            }

            new_node->next = this->head;
            this->head = new_node;
            size++;
            return;
        }

        void pop(){
            if(this->head == nullptr){
                cout<<"stack is empty"<<endl;
                return;
            }

            Node<T>* temp = this->head;
            this->head = this->head->next;
            temp->next = nullptr;
            delete temp;
            size--;
        }

        void top(){
            if(this->head == nullptr){
                cout<<"stack is empty"<<endl;
                return;
            }

            cout<<"top element is:"<<this->head->value<<endl;
            return;
        }

        void isEmpty(){
            if(this->head == nullptr){
                cout<<"stack is empty"<<endl;
                return;
            } else {
                  cout<<"stack is not empty"<<endl;
                return;
            }
        }

        void getSize(){
            cout<<"size of stack is: "<<this->size<<endl;
        }
};

int main(){
    Stack<char> s;
    s.push('a'); // 10
    s.push('b'); // 20 -> 10
    s.push('c'); // 30 -> 20 -> 10
    s.getSize(); // 3
    s.isEmpty(); //not empty
    s.pop(); // 20 -> 10
    s.getSize(); // 2
    s.pop(); // 10
    s.top(); // 10
    s.pop(); // 
    s.isEmpty(); // empty

}