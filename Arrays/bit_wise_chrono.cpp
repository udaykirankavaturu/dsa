#include <iostream>
#include <vector>
#include <chrono>

int findUniqueWithXOR(const std::vector<int>& nums) {
    int unique = 0;
    for (int num : nums) {
        unique ^= num;
    }
    return unique;
}


#include <unordered_set>

int findUniqueWithSet(const std::vector<int>& nums) {
    std::unordered_set<int> seen;
    for (int num : nums) {
        if (seen.count(num)) {
            seen.erase(num);
        } else {
            seen.insert(num);
        }
    }
    return *seen.begin(); // Assuming there is always one unique element
}


int main() {
    const int SIZE = 1000000; // Large size for noticeable runtime difference
    std::vector<int> nums;
    nums.reserve(SIZE);

    // Fill the vector with pairs of numbers and one unique
    for (int i = 0; i < SIZE / 2; ++i) {
        nums.push_back(i);
        nums.push_back(i);
    }
    nums.push_back(SIZE); // The unique element

    auto start = std::chrono::high_resolution_clock::now();
    std::cout << "Unique with XOR: " << findUniqueWithXOR(nums);
    auto end = std::chrono::high_resolution_clock::now();
    std::chrono::duration<double, std::milli> xor_time = end - start;
    std::cout << " in " << xor_time.count() << " ms\n";

    start = std::chrono::high_resolution_clock::now();
    std::cout << "Unique with Set: " << findUniqueWithSet(nums);
    end = std::chrono::high_resolution_clock::now();
    std::chrono::duration<double, std::milli> set_time = end - start;
    std::cout << " in " << set_time.count() << " ms\n";

    return 0;
}
