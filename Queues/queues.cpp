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

template<typename T>
class Queue{
    private:
        Node<T>* front;
        Node<T>* rear;
        int size;

    public:

        Queue(){
            this->front = nullptr;
            this->rear = nullptr;
            this->size = 0;
        }

        void enqueue(T value){
            Node<T>* new_node = new Node<T>(value);

            if(front == nullptr){
                front = rear = new_node;
                size++;
                return;
            }

            rear->next = new_node;
            rear = new_node;
            size++;
            return;
        }

        void dequeue(){
            if(front == nullptr){
                cout<<"queue is empty"<<endl;
                return;
            }

            Node<T>* temp = front;
            front = front->next;
            temp->next = nullptr;
            delete temp;
            size--;

            if(front == nullptr){
                rear = nullptr;
            }
        }

        void peek(){
            if(front == nullptr){
                cout<<"queue is empty"<<endl;
                return;
            }

            cout<<"front element is: "<<front->value<<endl;
            return;
        }

        void display(){
            if(front == nullptr){
                cout<<"queue is empty"<<endl;
                return;
            }

            Node<T>* temp = front;
            while(temp != nullptr){
                cout<<temp->value<<"<-";
                temp = temp->next;
            }
            cout<<endl;
            return;
        }

        bool isEmpty(){
             if(front == nullptr){
                return true;
            } else {
                return false;
            }
        }

        void getSize(){
            cout<<"the size of the queue is: "<<this->size<<endl;
        }

        ~Queue(){
            cout<<"destructor called"<<endl;
            while(!isEmpty()){
                dequeue();
            }
        }
};

int main(){
    Queue<int> q;
    q.enqueue(10); 
    q.display(); // 10 <-
    q.enqueue(20);
    q.display(); // 10 <-20 <-
    q.enqueue(30);
    q.display(); // 10 <- 20 <- 30 <-
    q.peek(); // 10
    q.getSize(); // 3
    q.dequeue(); 
    q.display(); // 20 <- 30 <-
    q.dequeue();
    q.display(); // 30 <-
    q.dequeue();
    q.display(); // queue is empty

    q.enqueue(40);
    q.display(); // 40 <-
}