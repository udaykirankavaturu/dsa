#include <iostream>
using namespace std;

class Node{
    public:
        int value;
        Node* next;

        Node(int value){
            this->value = value;
            this->next = nullptr;
        }
};

class LinkedList{
    private:
        Node* head;
    public:
    
        LinkedList(){
            this->head = nullptr;
        }

        void append(int value){
            Node* new_node = new Node(value);
            // check if head is null
            if(this->head == nullptr){
                cout<<"no nodes in the list, creating first node"<<endl;
                this->head = new_node;
                return;
            }

            // iterate through the list and append
            Node* current = this->head;
            while(current->next != nullptr){
                current =  current->next;
            }
            current->next =  new_node;
            return;

        }

        void read(){
            if(this->head == nullptr){
                cout<<"no nodes in the list"<<endl;
                return;
            }

            Node* current = this->head;
            while(current != nullptr){
                cout<<current->value<<"->";
                current =  current->next;
            }
            cout<<endl;
            return;
        }

        void prepend(int value){
            Node* new_node = new Node(value);
            if(this->head==nullptr){
                cout<<"list is empty, adding first node"<<endl;
                this->head = new_node;
                return;
            }

            new_node->next = this->head;
            this->head = new_node;
            return;
        }

        void update(int old_value, int new_value){
            if(this->head == nullptr){
                cout<<"list is empty"<<endl;
                return;
            }

            Node* current =  this->head;
            while(current->next != nullptr){
                if(current->value == old_value){
                    current->value = new_value;
                    return;
                }

                current = current->next;
            }

            cout<<"no node found with given value"<<endl;
            return;
        }

        void remove(int value){
            if(this->head == nullptr){
                cout<<"list is empty"<<endl;
                return;
            }

            // remove head node
            if(this->head->value == value){
                cout<<"removing head node"<<endl;
                Node* temp = this->head;
                this->head = this->head->next;
                delete temp;
                return;
            }

            Node* current =  this->head;
            Node* prev = nullptr;
            while(current->next != nullptr){

                if(current->value == value){
                    prev->next = current->next;
                    current->next = nullptr;
                    delete current;
                    return;
                }
                
                prev = current;
                current = current->next;
            }
        }
        
        ~LinkedList(){
            cout<<"destructor called"<<endl;
            if(this->head == nullptr){
                cout<<"no nodes to delete"<<endl;
                return;
            }

            Node* current = this->head;
            while(current != nullptr){
                Node* temp = current->next;
                current->next = nullptr;
                delete current;
                current = temp;
            }
            this->head = nullptr;
        }
};

int main(){

    LinkedList* list1 = new LinkedList();
    list1->append(10);
    list1->read();
    list1->append(20);
    list1->read();
    list1->append(30);
    list1->read();
    list1->prepend(5);
    list1->read();
    list1->update(20,25); 
    list1->read();
    list1->remove(5);
    list1->read();
    list1->remove(25);
    list1->read();
    delete list1;
    list1->read();

}