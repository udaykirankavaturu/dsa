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
            size = 0;
        }

        void push(T value){
            Node<T>* new_node = new Node<T>(value);

            if(this->head == nullptr){
                head =  new_node;
                size++;
                return;
            }

            new_node->next = head;
            head = new_node;
            size++;
        }

        void pop(){
            if(this->head == nullptr){
                cout<<"stack is empty"<<endl;
                return;
            }

            Node<T>* temp = head;
            head = head->next;
            temp->next = nullptr;
            delete temp;
            size--;
        }

        void top(){
            if(this->head == nullptr){
                cout<<"stack is empty"<<endl;
                return;
            }

            cout<<"top element is "<<this->head->value<<endl;
        }

        void empty(){
            if(this->head == nullptr){
                cout<<"stack is empty"<<endl;
                return;
            } else{
                cout<<"stack is not empty"<<endl;
                return;
            }
        }

        void getSize(){
            if(this->head == nullptr){
                cout<<"stack is empty"<<endl;
                return;
            }

            
            cout<<"size of stack is:"<<this->size<<endl;
        }
};

int main(){

    Stack<int>* s = new Stack<int>();


    s->push(10); 
    s->push(20); 
    s->getSize(); 
    s->top(); 
    s->pop();  
    s->getSize(); 
    s->top(); 
    s->empty(); 
    s->pop(); 
    s->getSize();
    s->empty(); 


}