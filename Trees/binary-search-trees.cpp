#include <iostream>
#include <queue>
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

class BST {
private:
    Node* root;

    Node* search(int value, Node* node) {
        if (node == nullptr || node->value == value) return node;
        if (value < node->value) return search(value, node->left);
        return search(value, node->right);
    }

    Node* searchParent(int value, Node* node, Node* parent) {
        if (node == nullptr || node->value == value) return parent;
        if (value < node->value) return searchParent(value, node->left, node);
        return searchParent(value, node->right, node);
    }

    void inOrderDisplay(Node* node) {
        if (node == nullptr) return;
        inOrderDisplay(node->left);
        cout << node->value << " ";
        inOrderDisplay(node->right);
    }

    void preOrderDisplay(Node* node) {
        if (node == nullptr) return;
        cout << node->value << " ";
        preOrderDisplay(node->left);
        preOrderDisplay(node->right);
    }

    void postOrderDisplay(Node* node) {
        if (node == nullptr) return;
        postOrderDisplay(node->left);
        postOrderDisplay(node->right);
        cout << node->value << " ";
    }

    void levelOrderDisplay(Node* node) {
        if (node == nullptr) return;
        queue<Node*> q;
        q.push(node);
        while (!q.empty()) {
            Node* front = q.front();
            cout << front->value << " ";
            q.pop();
            if (front->left != nullptr) q.push(front->left);
            if (front->right != nullptr) q.push(front->right);
        }
    }

    Node* findMin(Node* node) {
        while (node->left != nullptr) node = node->left;
        return node;
    }

    Node* deleteNode(Node* root, int value) {
        if (root == nullptr) return root;

        if (value < root->value) {
            root->left = deleteNode(root->left, value);
        } else if (value > root->value) {
            root->right = deleteNode(root->right, value);
        } else {
            // Node to be deleted found

            // Case 1: Node has no children (leaf node)
            if (root->left == nullptr && root->right == nullptr) {
                delete root;
                return nullptr;
            }

            // Case 2: Node has one child
            if (root->left == nullptr) {
                Node* temp = root->right;
                delete root;
                return temp;
            } else if (root->right == nullptr) {
                Node* temp = root->left;
                delete root;
                return temp;
            }

            // Case 3: Node has two children
            // Find the in-order successor (smallest in the right subtree)
            Node* temp = findMin(root->right);

            // Replace the value of the node to be deleted
            root->value = temp->value;

            // Delete the in-order successor
            root->right = deleteNode(root->right, temp->value);
        }
        return root;
    }

public:
    BST() {
        root = nullptr;
    }

    void insert(int value) {
        if (root == nullptr) {
            root = new Node(value);
            return;
        }

        Node* parent_node = searchParent(value, root, nullptr);
        if (parent_node == nullptr) {
            cout << "Parent node not found to insert" << endl;
            return;
        }

        Node* new_node = new Node(value);
        if (value < parent_node->value) {
            parent_node->left = new_node;
        } else if (value > parent_node->value) {
            parent_node->right = new_node;
        } else {
            cout << "Node already exists" << endl;
        }
    }

    void display() {
        if (root == nullptr) {
            cout << "Tree is empty" << endl;
            return;
        }

        cout << "In Order Display" << endl;
        inOrderDisplay(root);
        cout << endl;
        cout << "Pre Order Display" << endl;
        preOrderDisplay(root);
        cout << endl;
        cout << "Post Order Display" << endl;
        postOrderDisplay(root);
        cout << endl;
        cout << "Level Order Display" << endl;
        levelOrderDisplay(root);
        cout << endl;
    }

    void remove(int value) {
        if (root == nullptr) {
            cout << "Tree is empty" << endl;
            return;
        }
        root = deleteNode(root, value);
    }
};

int main() {
    BST bst;
    bst.insert(10);
    bst.insert(5);
    bst.insert(15);
    bst.insert(3);
    bst.insert(7);
    bst.insert(12);
    bst.insert(20);
    bst.display();
    bst.remove(5);
    bst.display();
    bst.remove(15);
    bst.display();
    bst.remove(10);
    bst.display();
    return 0;
}
