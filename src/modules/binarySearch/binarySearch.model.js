export const sections = [
  {
    id: "b1",
    title: "Basic Function Setup",
    defaultCell: {
      id: "b1-default",
      code: `
#run this cell
def locate_card(cards, query):
    pass 
    #we will implement this later

cards = [90, 80, 70, 60, 50, 40, 30, 20, 10]
query = 40
output = 5
result = locate_card(cards, query)
print(result) 
result==output 
    `,
      output: "",
      isError: false
    },
    userCells: []
  },
  
  
  {
    id: "b2",
    title: "Create Test Case",
    defaultCell: {
      id: "b2-default",
      code: `  
test = {
  'input': 
    { 
    'cards': [90, 80, 70, 60, 50, 40, 30, 20, 10], 
    'query': 40
    },
  'output': 5
}
`,
      output: "",
      isError: false
    },
    userCells: []
  },


  {
    id: "b3",
    title: "Verify Test Case",
    defaultCell: {
      id: "b3-default",
      code: `
locate_card(**test['input']) == test['output']
`,
      output: "",
      isError: false
    },
    userCells: []
  },

  
  {
    id: "b4",
    title: "Create Multiple Test Cases",
    defaultCell: {
      id: "b4-default",
      code: `
tests = []
# query occurs in the middle
tests.append(test)

tests.append({
    'input': {
        'cards': [90,80, 70, 60, 50, 40, 30, 20,10],
        'query': 50
    },
    'output': 4
})
`,
      output: "",
      isError: false
    },
    userCells: []
  },


  {
    id: "b5",
    title: "Test Case: First Element",
    defaultCell: {
      id: "b5-default",
      code: `
# query is the first element
tests.append({
    'input': {
        'cards': [90,80, 70, 60, 50, 40, 30, 20,10],
        'query': 90
    },
    'output': 0
})
`,
      output: "",
      isError: false
    },
    userCells: []
  },

  {
    id: "b6",
    title: "Test Case: Last Element",
    defaultCell: {
      id: "b6-default",
      code: `
# query is the last element
tests.append({
    'input': {
        'cards': [90,80, 70, 60, 50, 40, 30, 20,10],
        'query': 10
    },
    'output': 8
})
`,
      output: "",
      isError: false
    },
    userCells: []
  },

  {
    id: "b7",
    title: "Test Case: Single Element",
    defaultCell: {
      id: "b7-default",
      code: `
# cards contains just one element, query
tests.append({
    'input': {
        'cards': [40],
        'query': 40
    },
    'output': 0
})
`,
      output: "",
      isError: false
    },
    userCells: []
  },

  {
    id: "b8",
    title: "Test Case: Element Not Found",
    defaultCell: {
      id: "b8-default",
      code: `
# cards does not contain query 
tests.append({
    'input': {
        'cards': [90,80, 70, 60, 50, 40, 30, 20,10],
        'query': 5
    },
    'output': -1
})
`,
      output: "",
      isError: false
    },
    userCells: []
  },


  {
    id: "b9",
    title: "Test Case: Empty Array",
    defaultCell: {
      id: "b9-default",
      code: `
# cards is empty
tests.append({
    'input': {
        'cards': [],
        'query': 40
    },
    'output': -1
})
`,
      output: "",
      isError: false
    },
    userCells: []
  },


  {
    id: "b10",
    title: "Test Case: Duplicates",
    defaultCell: {
      id: "b10-default",
      code: `
# numbers can repeat in cards
tests.append({
'input': {
    'cards': [90, 90, 70, 70, 70, 40, 30, 10, 10],
    'query': 40
},
'output': 5
})
`,
      output: "",
      isError: false
    },
    userCells: []
  },

  {
    id: "b11",
    title: "Test Case: First Occurrence of Duplicates",
    defaultCell: {
      id: "b11-default",
      code: `
# query occurs multiple times, return first occurrence
tests.append({
'input': {
    'cards': [90, 80, 70, 40, 40, 40, 30, 20, 10],
    'query': 40
},
'output': 3
})
`,
      output: "",
      isError: false
    },
    userCells: []
  },

  {
    id: "b12",
    title: "Display All Tests",
    defaultCell: {
      id: "b12-default",
      code: `
tests
`,
      output: "",
      isError: false
    },
    userCells: []
  },

  {
    id: "b13",
    title: "Linear Search Implementation",
    defaultCell: {
      id: "b13-default",
      code: `
def locate_card(cards, query):
    # Create a variable position with the value 0
    position = 0
    
    # Set up a loop for repetition
    while True:
        
        # Check if element at the current position matche the query
        if cards[position] == query:
            
            # Answer found! Return and exit..
            return position
        
        # Increment the position
        position += 1
        
        # Check if we have reached the end of the array
        if position == len(cards):
            
            # Number not found, return -1
            return -1
`,
      output: "",
      isError: false
    },
    userCells: []
  },

  {
    id: "b14",
    title: "Display Single Test",
    defaultCell: {
      id: "b14-default",
      code: `
test
`,
      output: "",
      isError: false
    },
    userCells: []
  },

  {
    id: "b15",
    title: "Run Single Test",
    defaultCell: {
      id: "b15-default",
      code: `
result = locate_card(test['input']['cards'], test['input']['query'])
result
`,
      output: "",
      isError: false
    },
    userCells: []
  },

  {
    id: "b16",
    title: "Verify Result",
    defaultCell: {
      id: "b16-default",
      code: `
result == output
`,
      output: "",
      isError: false
    },
    userCells: []
  },

  {
    id: "b17",
    title: "Run All Tests",
    defaultCell: {
      id: "b17-default",
      code: `
for i, test in enumerate(tests):
    print(f"-----case {i}----")
    cards = test['input']['cards']
    query = test['input']['query']
    output = test['output']

    result = locate_card(cards, query)

    print("cards:", cards)
    print("query:", query)
    print("result:", result)
    print("successfully tested?", result == output)
    print()    
`,
      output: "",
      isError: false
    },
    userCells: []
  },

  {
    id: "b18",
    title: "Linear Search Refactored",
    defaultCell: {
      id: "b18-default",
      code: `
def locate_card(cards, query):
    position = 0
    
    while True:
        
        
        if cards[position] == query:
            return position
        
        position += 1
        if position == len(cards):
            return -1
`,
      output: "",
      isError: false
    },
    userCells: []
  },

  {
    id: "b19",
    title: "Linear Search with Debugging",
    defaultCell: {
      id: "b19-default",
      code: `
def locate_card(cards, query):
    position = 0
    
    print('cards:', cards)
    print('query:', query)
    
    while True:
        print('position:', position)
        
        if cards[position] == query:
            return position
        
        position += 1
        if position == len(cards):
            return -1
`,
      output: "",
      isError: false
    },
    userCells: []
  },

  {
    id: "b20",
    title: "Test Edge Case: Empty Array",
    defaultCell: {
      id: "b20-default",
      code: `
cards=[]
query=40
locate_card(cards, query)
`,
      output: "",
      isError: false
    },
    userCells: []
  },

  {
    id: "b21",
    title: "Optimized Linear Search",
    defaultCell: {
      id: "b21-default",
      code: `
def locate_card(cards, query):
    position = 0
    while position < len(cards):
        if cards[position] == query:
            return position
        position += 1
    return -1
`,
      output: "",
      isError: false
    },
    userCells: []
  },

  {
    id: "b22",
    title: "Test All Cases with Output",
    defaultCell: {
      id: "b22-default",
      code: `
for i, test in enumerate(tests):
    print(f"-----case {i}----")
    cards = test['input']['cards']
    query = test['input']['query']
    output = test['output']

    result = locate_card(cards, query)

    print("cards:", cards)
    print("query:", query)
    print("result:", result)
    print("successfully tested?", result == output)
    print()

`,
      output: "",
      isError: false
    },
    userCells: []
  },

  {
    id: "b23",
    title: "Binary Search Implementation with Debugging",
    defaultCell: {
      id: "b23-default",
      code: `
def locate_card(cards, query):
    lo, hi = 0, len(cards) - 1
    
    while lo <= hi:
        mid = (lo + hi) // 2
        mid_number = cards[mid]
        
        print("lo:", lo, ", hi:", hi, ", mid:", mid, ", mid_number:", mid_number)
        
        if mid_number == query:
            return mid
        elif mid_number < query:
            hi = mid - 1  
        elif mid_number > query:
            lo = mid + 1
    
    return -1
`,
      output: "",
      isError: false
    },
    userCells: []
  },

  {
    id: "b24",
    title: "Run All Tests with Output",
    defaultCell: {
      id: "b24-default",
      code: `
for i, test in enumerate(tests):
    print(f"-----case {i}----")
    cards = test['input']['cards']
    query = test['input']['query']
    output = test['output']

    result = locate_card(cards, query)

    print("cards:", cards)
    print("query:", query)
    print("result:", result)
    print("successfully tested?", result == output)
    print()
`,
      output: "",
      isError: false
    },
    userCells: []
  },

  {
    id: "b25",
    title: "Test Specific Case",
    defaultCell: {
      id: "b25-default",
      code: `
i = 8
print(f"-----case {i}----")

test = tests[i]
cards = test['input']['cards']
query = test['input']['query']
output = test['output']
print(cards)
print(query)
print(output)
`,
      output: "",
      isError: false
    },
    userCells: []
  },

  {
    id: "b26",
    title: "Binary Search Implementation",
    defaultCell: {
      id: "b26-default",
      code: `
def test_location(cards, query, mid):
    mid_number = cards[mid]
    print("mid:", mid, ", mid_number:", mid_number)
    if mid_number == query:
        if mid-1 >= 0 and cards[mid-1] == query:
            return 'left'
        else:
            return 'found'
    elif mid_number < query:
        return 'left'
    else:
        return 'right'

def locate_card(cards, query):
    lo, hi = 0, len(cards) - 1
    
    while lo <= hi:
        print("lo:", lo, ", hi:", hi)
        mid = (lo + hi) // 2
        result = test_location(cards, query, mid)
        
        if result == 'found':
            return mid
        elif result == 'left':
            hi = mid - 1
        elif result == 'right':
            lo = mid + 1
    return -1
`,
      output: "",
      isError: false
    },
    userCells: []
  },

  {
    id: "b27",
    title: "Test Binary Search",
    defaultCell: {
      id: "b27-default",
      code: `
# Test the binary search implementation
for i, test in enumerate(tests):
    cards = test['input']['cards']
    query = test['input']['query']
    expected = test['output']
    result = binary_search(cards, query)
    print(f"Test {i}: {result == expected}")
`,
      output: "",
      isError: false
    },
    userCells: []
  },

  {
    id: "b28",
    title: "Edge Case: Empty Array",
    defaultCell: {
      id: "b28-default",
      code: `
# Test with empty array
empty_test = {
    'input': {
        'cards': [],
        'query': 50
    },
    'output': -1
}
result = binary_search(empty_test['input']['cards'], empty_test['input']['query'])
print(f"Empty array test: {result == empty_test['output']}")
`,
      output: "",
      isError: false
    },
    userCells: []
  },

  {
    id: "b29",
    title: "Edge Case: Single Element",
    defaultCell: {
      id: "b29-default",
      code: `
# Test with single element
single_test = {
    'input': {
        'cards': [50],
        'query': 50
    },
    'output': 0
}
result = binary_search(single_test['input']['cards'], single_test['input']['query'])
print(f"Single element test: {result == single_test['output']}")
`,
      output: "",
      isError: false
    },
    userCells: []
  },

  {
    id: "b30",
    title: "Edge Case: Query Not Found",
    defaultCell: {
      id: "b30-default",
      code: `
# Test when query is not in array
not_found_test = {
    'input': {
        'cards': [90, 80, 70, 60, 50, 40, 30, 20, 10],
        'query': 45
    },
    'output': -1
}
result = binary_search(not_found_test['input']['cards'], not_found_test['input']['query'])
print(f"Not found test: {result == not_found_test['output']}")
`,
      output: "",
      isError: false
    },
    userCells: []
  },

  {
    id: "b31",
    title: "Time Complexity Analysis",
    defaultCell: {
      id: "b31-default",
      code: `
import math

def analyze_time_complexity(n):
    return math.log2(n)

# For array of different sizes
sizes = [10, 100, 1000, 10000, 100000]
for size in sizes:
    comparisons = analyze_time_complexity(size)
    print(f"Array size: {size}, Max comparisons: {int(comparisons) + 1}")
`,
      output: "",
      isError: false
    },
    userCells: []
  },

  {
    id: "b32",
    title: "Space Complexity Analysis",
    defaultCell: {
      id: "b32-default",
      code: `
# Binary search uses O(1) space with iterative approach
# vs O(log n) with recursive approach

def binary_search_recursive(cards, query, left=0, right=None):
    if right is None:
        right = len(cards) - 1
    
    if left > right:
        return -1
    
    mid = (left + right) // 2
    if cards[mid] == query:
        return mid
    elif cards[mid] > query:
        return binary_search_recursive(cards, query, left, mid - 1)
    else:
        return binary_search_recursive(cards, query, mid + 1, right)

print("Recursive approach uses O(log n) space for call stack")
print("Iterative approach uses O(1) space")
`,
      output: "",
      isError: false
    },
    userCells: []
  },

  {
    id: "b33",
    title: "Visualize Search Process",
    defaultCell: {
      id: "b33-default",
      code: `
def binary_search_debug(cards, query):
    left = 0
    right = len(cards) - 1
    steps = 0
    
    while left <= right:
        mid = (left + right) // 2
        steps += 1
        print(f"Step {steps}: left={left}, right={right}, mid={mid}, cards[mid]={cards[mid]}")
        
        if cards[mid] == query:
            print(f"Found at index {mid}")
            return mid
        elif cards[mid] > query:
            left = mid + 1
        else:
            right = mid - 1
    
    print(f"Not found after {steps} steps")
    return -1

result = binary_search_debug([90, 80, 70, 60, 50, 40, 30, 20, 10], 40)
`,
      output: "",
      isError: false
    },
    userCells: []
  },

  {
    id: "b34",
    title: "Compare Algorithms",
    defaultCell: {
      id: "b34-default",
      code: `
import time

def linear_search(cards, query):
    for i, card in enumerate(cards):
        if card == query:
            return i
    return -1

# Compare performance
large_array = list(range(100000, 0, -1))
query = 50000

start = time.time()
linear_search(large_array, query)
linear_time = time.time() - start

start = time.time()
binary_search(large_array, query)
binary_time = time.time() - start

print(f"Linear search: {linear_time:.6f}s")
print(f"Binary search: {binary_time:.6f}s")
print(f"Speedup: {linear_time/binary_time:.2f}x")
`,
      output: "",
      isError: false
    },
    userCells: []
  },

  {
    id: "b35",
    title: "Summary and Notes",
    defaultCell: {
      id: "b35-default",
      code: `
# Binary Search Summary
# - Works only on sorted arrays
# - Time Complexity: O(log n)
# - Space Complexity: O(1) iterative, O(log n) recursive
# - Divide and conquer algorithm
# - Much faster than linear search for large datasets

print("Binary Search Complete!")
print("Key Takeaways:")
print("1. Array must be sorted")
print("2. Divide search space in half each iteration")
print("3. Compare target with middle element")
print("4. Eliminate half of remaining elements")
`,
      output: "",
      isError: false
    },
    userCells: []
  }


  
];




