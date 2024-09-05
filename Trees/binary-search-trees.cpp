#include <iostream>
#include <queue>
#include <utility>
using namespace std;

class Node {
    public:
        int value;
        Node* left;
        Node* right;

        Node(int value){
            this->value = value;
            this->left = nullptr;
            this->right = nullptr;
        }
};

class BST{
    private:
        Node* root;

        Node* getParent(int value){
            Node* current = root;
            Node* parent = nullptr; 

            while (current != nullptr) {
                parent = current;

                if (value < current->value) {
                    current = current->left;
                } else if (value > current->value) {
                    current = current->right;
                } else {
                    cout << "Value already exists in tree" << endl;
                    return nullptr;
                }
            }

            return parent;
        }

        void levelOrderDisplay(){
            queue<Node*> q;
            q.push(root);

            while(!q.empty()){
                Node* front = q.front();
                q.pop();

                cout<<front->value<<" ";

                if(front->left != nullptr){
                    q.push(front->left);
                }

                if(front->right != nullptr){
                    q.push(front->right);
                }
            }
        }

        pair<Node*, Node*> getNodeAndParent(int value){
            Node* current = root;
            Node* parent = nullptr;

            while(current !=nullptr){

                if(value < current->value){
                    parent = current;
                    current = current->left;
                } else if(value > current->value){
                    parent = current;
                    current = current->right;
                } else {
                    return make_pair(parent, current);
                }
            }

            return make_pair(nullptr, nullptr);
        }
    public:
        BST() {
            root = nullptr; 
        }

        void insert(int value){
            if(root == nullptr){
                root = new Node(value);
                cout<<value<<" added as root node"<<endl;
                return;
            } 

            Node* parent = getParent(value);

            if(parent == nullptr) {
                return;
            }
            else if(value < parent->value){
                parent->left = new Node(value);
            }else{
                parent->right = new Node(value);
            }

            cout<<value<<" added to tree"<<endl;

        }

        void display(){
            if(root == nullptr){
                cout<<"tree is empty"<<endl;
                return;
            }

            cout<<endl;
            cout<<"level order display"<<endl;
            levelOrderDisplay();
            cout<<endl;
        }

        void remove(int value){
            if(root == nullptr){
                cout<<"tree is empty"<<endl;
                return;
            }

            // search for the node and get parent as well
            pair<Node*, Node*> nodes = getNodeAndParent(value);
            Node* parent = nodes.first;
            Node* nodeToBeRemoved = nodes.second;
            if(nodeToBeRemoved == nullptr){
                cout<<"value not found"<<endl;
                return;
            }

            // case 1 - leaf node
            if(nodeToBeRemoved->left == nullptr && nodeToBeRemoved->right == nullptr){
                // remove connection from parent
                if(parent == nullptr){
                    root = nullptr;
                } else if(parent->left == nodeToBeRemoved){
                    parent->left = nullptr;
                } else {
                    parent->right = nullptr;
                }


                delete nodeToBeRemoved;
                return;
            } 
            // case 2 - single child
            else if(nodeToBeRemoved->left == nullptr || nodeToBeRemoved->right == nullptr){
                Node* child;
                if(nodeToBeRemoved->left != nullptr){
                    child = nodeToBeRemoved->left;
                } else {
                    child = nodeToBeRemoved->right;
                }

                // connect with parent
                if(parent == nullptr){
                    root = child;
                } else if(parent->left == nodeToBeRemoved){
                    parent->left = child;
                } else {
                    parent->right = child;
                }

                delete nodeToBeRemoved;
                return;
            } 
            // case 3 - two children
            else {
                // // find the rightmost node in the left subtree
                // Node* rightMostNode = nodeToBeRemoved->left;
                // Node* rightMostNodeParent = nodeToBeRemoved;

                // // Traverse to the rightmost node in the left subtree
                // while (rightMostNode->right != nullptr) {
                //     rightMostNodeParent = rightMostNode;
                //     rightMostNode = rightMostNode->right;
                // }

                // // Replace the value of nodeToBeRemoved with the rightmost node's value
                // nodeToBeRemoved->value = rightMostNode->value;

                // // Now we need to remove the rightmost node (which has either 0 or 1 child)
                // Node* child = rightMostNode->left;

                // if (rightMostNodeParent->left == rightMostNode) {
                //     rightMostNodeParent->left = child;
                // } else {
                //     rightMostNodeParent->right = child; 
                // }

                // find the left most node in the right sub tree
                Node* leftMostNode = nodeToBeRemoved->right;
                Node* leftMostNodeParent = nodeToBeRemoved;

                while(leftMostNode->left != nullptr){
                    leftMostNodeParent = leftMostNode;
                    leftMostNode = leftMostNode->left;
                }

                nodeToBeRemoved->value = leftMostNode->value;

                Node* child = leftMostNode->right;
                if(leftMostNodeParent->left == leftMostNode){
                    leftMostNodeParent->left = child;
                } else {
                    leftMostNodeParent->right = child;
                }

                // Finally, delete the rightmost node
                delete leftMostNode;
                return;
            }

        }
        
};

int main(){
    BST bst;
    bst.insert(100);
    bst.insert(90);
    bst.insert(110);
    bst.insert(80);
    bst.insert(95);
    bst.insert(93);

    bst.display();

    bst.insert(93);

    bst.remove(110);
    cout<<"after removing 110"<<endl;
    bst.display();

    bst.remove(95);
    cout<<"after removing 95"<<endl;
    bst.display();

    bst.remove(90);
    cout<<"after removing 90"<<endl;
    bst.display();
}