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
    low, high = 0, len(cards) - 1
    
    while low <= high:
        mid = (low+ high) // 2
        mid_number = cards[mid]
        
        if mid_number == query:
            return mid
        elif mid_number < query:
            high = mid - 1  
        elif mid_number > query:
            low = mid + 1
    
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
    title: "New Locate Card Function",
    defaultCell: {
      id: "b26-default",
      code: `
def locate_card(cards, query):
    
    def condition(mid):
        if cards[mid] == query:
            if mid > 0 and cards[mid-1] == query:
                return 'left'
            else:
                return 'found'
        elif cards[mid] < query:
            return 'left'
        else:
            return 'right'
    
    return binary_search(0, len(cards) - 1, condition)
`,
      output: "",
      isError: false
    },
    userCells: []
  },
  {
    id: "b27",
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
    id: "b28",
    title: "binary",
    defaultCell: {
      id: "b24-default",
      code: `
def binary_search(lo, hi, condition):
    """TODO - add docs"""
    while lo <= hi:
        mid = (lo + hi) // 2
        result = condition(mid)
        if result == 'found':
            return mid
        elif result == 'left':
            hi = mid - 1
        else:
            lo = mid + 1
    return -1
`,
      output: "",
      isError: false
    },
    userCells: []
  }

  
];




