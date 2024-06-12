#include <iostream>
#include <queue>
#include <vector>
using namespace std;

class Node{
    public:
        int value;
        vector<Node*> children;

        Node(int value){
            this->value = value;
        }
};

class Tree{
    private:
        Node* root;

        Node* search(int value){
            if(root == nullptr){
                cout<<"tree is empty"<<endl;
                return nullptr;
            }
            return DFS(root, value);
            // return BFS(root, value);
        }

        Node* DFS(Node* node, int value){
            if(node == nullptr){
                return nullptr;
            }

            if(node->value == value){
                return node;
            }

            for(const auto& child: node->children){
                Node* search_result = DFS(child, value);
                if(search_result != nullptr){
                    return search_result;
                }
            }

            return nullptr;
        }

        Node* BFS(Node* node, int value){
             if(node == nullptr){
                return nullptr;
            }

            if(node->value == value){
                return node;
            }

            queue<Node*> q;
            q.push(node);

            while(!q.empty()){
                Node* front = q.front();
                if(front->value == value){
                    return front;
                }
                q.pop();

                for(const auto& child: front->children){
                    q.push(child);
                }
            }

            return nullptr;
        }

        void printDF(Node* node){
            if(node == nullptr){
                return;
            }

            cout<<node->value<<" ";

            for(const auto& child: node->children){
                printDF(child);
            }
        }

        void printBF(Node* node){
            if(node == nullptr){
                return;
            }

            queue<Node*> q;
            q.push(node);

            while(!q.empty()){
                Node* front = q.front();
                cout<<front->value<<" ";
                q.pop();

                for(const auto& child: front->children){
                    q.push(child);
                }
            }
        }

        Node* searchParent(Node* node, Node* parent, int value){
            
            if(node == nullptr){
                return nullptr;
            }

            if(node->value == value){
                return parent;
            }

            for(const auto& child: node->children){
                Node* search_result = searchParent(child, node, value);
                if(search_result != nullptr){
                    return search_result;
                }
            }

            cout<<"parent not found"<<endl;
            return nullptr;

        }

    public:
        Tree(){
            root = nullptr;
        }

        void insert(int parent, int value){
            if(root == nullptr){
                Node* new_node = new Node(value);
                root = new_node;
                cout<<"root node added"<<endl;
                return;
            }

            Node* parent_node = search(parent);
            if(parent_node == nullptr){
                cout<<"parent not found"<<endl;
                return;
            }
            Node* new_node = new Node(value);
            parent_node->children.push_back(new_node);
            return;
        }

        void display(){
            if(root == nullptr) {
                cout<<"tree is empty"<<endl;
                return;
            }

            cout<<"depth first print"<<endl;
            printDF(root);
            cout<<endl;
            cout<<"breadth first print"<<endl;
            printBF(root);
            cout<<endl;
        }

        void remove(int value){

            if(root == nullptr){
                cout<<"tree is empty"<<endl;
                return;
            }

            if(root->value == value){
                if(!root->children.empty()){
                    cout<<"cannot remove root with children"<<endl;
                    return;
                }

                delete root;
                root = nullptr;
                return;
            }

            Node* parent = searchParent(root, nullptr, value);

            if(parent == nullptr){
                return;
            }

            Node* nodeToBeRemoved = nullptr;
            for(const auto& child: parent->children){
                if(child->value == value){
                    nodeToBeRemoved = child;
                    break;
                }
            }

            for(const auto& child: nodeToBeRemoved->children){
                parent->children.push_back(child);
            }

            for(auto it = parent->children.begin(); it != parent->children.end();it++){
                if((*it)->value == value){
                    parent->children.erase(it);
                    break;
                }
            }

            delete nodeToBeRemoved;

            
        }
};

int main(){
    Tree t;
    t.insert(0,10);
    t.insert(10,20);
    t.insert(10,30);
    t.insert(20,40);
    t.insert(20,60);
    t.insert(30,50); 
    t.display();

    t.remove(20);
    t.display();
}