#include <iostream>
#include <queue>
#include <vector>
using namespace std;

class Node {
public:
    int value;
    vector<Node*> children;

    Node(int value) {
        this->value = value;
    }
};

class Tree {
private:
    Node* root;
    
    Node* DFS(int value, Node* node) {
        if (node == nullptr) {
            return nullptr;
        }

        if (node->value == value) {
            return node;
        }

        for (const auto& child : node->children) {
            Node* search_result = DFS(value, child);
            if (search_result != nullptr) {
                return search_result;
            }
        }
        return nullptr;
    }
    
    Node* BFS(int value, Node* node) {
        queue<Node*> q;
        q.push(node);

        while (!q.empty()) {
            Node* front = q.front();
            if (front->value == value) {
                return front;
            }
            q.pop();

            for (const auto& child : front->children) {
                q.push(child);
            }
        }

        return nullptr;
    }
    
    void displayDF(Node* node) {
        if (node == nullptr) {
            return;
        }

        cout << node->value << " ";

        for (const auto& child : node->children) {
            displayDF(child);
        }
    }
    
    void displayBF(Node* node) {
        queue<Node*> q;
        q.push(node);

        while (!q.empty()) {
            Node* front = q.front();
            if (front != nullptr) {
                cout << front->value << " ";
            }
            q.pop();

            for (const auto& child : front->children) {
                q.push(child);
            }
        }
    }
    
    Node* searchParent(int value, Node* node, Node* parent) {
        if (node == nullptr) {
            return nullptr;
        }

        if (node->value == value) {
            return parent;
        }

        for (const auto& child : node->children) {
            Node* search_result = searchParent(value, child, node);
            if (search_result != nullptr) {
                return search_result;
            }
        }

        return nullptr;
    }

public:
    Tree() {
        root = nullptr;
    }

    void insert(int parent, int value) {
        if (root == nullptr) {
            Node* new_node = new Node(value);
            root = new_node;
            return;
        }

        Node* parent_node = search(parent);
        if (parent_node == nullptr) {
            cout << "parent node not found" << endl;
            return;
        }
        Node* new_node = new Node(value);
        parent_node->children.push_back(new_node);
    }
    
    Node* search(int value) {
        if (root == nullptr) {
            cout << "tree is empty" << endl;
            return nullptr;
        }

        // return DFS(value, root);
        return BFS(value, root);
    }
    
    void display() {
        cout << "depth first print" << endl;
        displayDF(root);
        cout << endl;
        cout << "breadth first print" << endl;
        displayBF(root);
        cout << endl;
    }
    
    void remove(int value) {
        if (root == nullptr) {
            cout << "tree is empty" << endl;
            return;
        }

        if (root->value == value) {
            if (!root->children.empty()) {
                cout << "cannot remove root node with children" << endl;
                return;
            }

            delete root;
            root = nullptr;
            return;
        }

        Node* parent_node = searchParent(value, root, nullptr);
        if (parent_node == nullptr) {
            cout << "parent node not found" << endl;
            return;
        }

        Node* nodeToBeRemoved = nullptr;
        for (auto it = parent_node->children.begin(); it != parent_node->children.end(); ++it) {
            if ((*it)->value == value) {
                nodeToBeRemoved = *it;
                parent_node->children.erase(it);
                break;
            }
        }

        if (nodeToBeRemoved == nullptr) {
            cout << "node to be removed not found" << endl;
            return;
        }

        for (const auto& child : nodeToBeRemoved->children) {
            parent_node->children.push_back(child);
        }

        delete nodeToBeRemoved;
    }
};

int main() {
    Tree t;
    t.insert(0, 10);
    t.insert(10, 20);
    t.insert(10, 30);
    t.insert(20, 40);
    t.insert(20, 60);
    t.insert(30, 50);
    t.insert(30, 70);
    t.display();
    // df print
    // 10 20 40 60 30 50 70
    // bf print
    // 10 20 30 40 60 50 70

    t.remove(20);
    t.display();
    // df 10 30 50 70 40 60
    // bf 10 30 40 60 50 70

    return 0;
}
