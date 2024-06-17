#include <iostream>
#include <queue>
#include <utility>
using namespace std;

class Node {
public:
    int value;
    Node* left;
    Node* right;

    Node(int value) {
        this->value = value;
        this->left = nullptr;
        this->right = nullptr;
    }
};

class BT {
private:
    Node* root;

    void inOrder(Node* node) {
        if (node == nullptr) {
            return;
        }
        inOrder(node->left);
        cout << node->value << " ";
        inOrder(node->right);
    }

    void preOrder(Node* node) {
        if (node == nullptr) {
            return;
        }
        cout << node->value << " ";
        preOrder(node->left);
        preOrder(node->right);
    }

    void postOrder(Node* node) {
        if (node == nullptr) {
            return;
        }
        postOrder(node->left);
        postOrder(node->right);
        cout << node->value << " ";
    }

    void levelOrder(Node* node) {
        if (node == nullptr) {
            return;
        }
        queue<Node*> q;
        q.push(node);
        while (!q.empty()) {
            Node* front = q.front();
            cout << front->value << " ";
            q.pop();

            if (front->left != nullptr) {
                q.push(front->left);
            }
            if (front->right != nullptr) {
                q.push(front->right);
            }
        }
    }

    Node* search(int value) {
        if (root == nullptr) {
            return nullptr;
        }
        queue<Node*> q;
        q.push(root);

        while (!q.empty()) {
            Node* front = q.front();
            q.pop();
            if (front->value == value) {
                return front;
            }

            if (front->left != nullptr) {
                q.push(front->left);
            }

            if (front->right != nullptr) {
                q.push(front->right);
            }
        }
        return nullptr;
    }

    pair<Node*, Node*> getRightMostNodeAndParent() {
        if (root == nullptr) {
            return make_pair(nullptr, nullptr);
        }

        Node* parent = nullptr;
        Node* current = root;
        while (current->right != nullptr) {
            parent = current;
            current = current->right;
        }

        return make_pair(current, parent);
    }

public:
    BT() {
        this->root = nullptr;
    }

    void insert(int value) {
        if (root == nullptr) {
            root = new Node(value);
            return;
        }

        queue<Node*> q;
        q.push(root);

        while (!q.empty()) {
            Node* front = q.front();
            q.pop();

            if (front->left == nullptr) {
                front->left = new Node(value);
                break;
            }
            q.push(front->left);

            if (front->right == nullptr) {
                front->right = new Node(value);
                break;
            }
            q.push(front->right);
        }
    }

    void remove(int value) {
        if (root == nullptr) {
            cout << "Tree is empty" << endl;
            return;
        }

        Node* node = search(value);
        if (node == nullptr) {
            cout << "Node not found" << endl;
            return;
        }

        pair<Node*, Node*> rightMostNodeAndParent = getRightMostNodeAndParent();
        Node* rightMostNode = rightMostNodeAndParent.first;
        Node* parent = rightMostNodeAndParent.second;

        if (rightMostNode == nullptr) {
            return;
        }

        if (rightMostNode == root) {
            delete root;
            root = nullptr;
            return;
        }

        node->value = rightMostNode->value;
        parent->right = rightMostNode->left;
        

        delete rightMostNode;
    }

    void display() {
        cout << "InOrder Display" << endl;
        inOrder(root);
        cout << endl;
        cout << "PreOrder Display" << endl;
        preOrder(root);
        cout << endl;
        cout << "PostOrder Display" << endl;
        postOrder(root);
        cout << endl;
        cout << "LevelOrder Display" << endl;
        levelOrder(root);
        cout << endl;
    }
};

int main() {
    BT bt;
    bt.insert(10);
    bt.insert(20);
    bt.insert(30);
    bt.insert(40);
    bt.insert(50);
    bt.display();
    bt.remove(10);
    cout<<"after remove"<<endl;
    bt.display();
}
