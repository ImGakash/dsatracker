export const sections = [
  {
    id: "b1",
    title: "Basic Function Setup",
    defaultCell: {
      id: "b1-default",
      code: `
def sort(nums):
    pass 
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
tests = []

test = {
    # List of numbers in random order
    "input": {
        "nums": [4, 2, 6, 3, 4, 6, 2, 1]
    },
    "output": [1, 2, 2, 3, 4, 4, 6, 6]
}
tests.append(test)

`,
      output: "",
      isError: false
    },
    userCells: []
  },


  {
    id: "b5",
    title: "Verify Test Case",
    defaultCell: {
      id: "b5-default",
      code: `
# A list that's sorted in descending order
test = {
    'input': {
        'nums': [99, 10, 9, 8, 6, 5, 3]
    },
    'output': [3, 5, 6, 8, 9, 10, 99]
}
tests.append(test)
`,
      output: "",
      isError: false
    },
    userCells: []
  },

  
  {
    id: "b3",
    title: "Create Multiple Test Cases",
    defaultCell: {
      id: "b3-default",
      code: `
# List of numbers in random order
test = {
    'input': {
        'nums': [5, 2, 6, 1, 23, 7, -12, 12, -243, 0]
    },
    'output': [-243, -12, 0, 1, 2, 5, 6, 7, 12, 23]
}
tests.append(test)
`,
      output: "",
      isError: false
    },
    userCells: []
  },


  {
    id: "b4",
    title: "Test Case: First Element",
    defaultCell: {
      id: "b4-default",
      code: `
# A list that's already sorted
test = {
    'input': {
        'nums': [3, 5, 6, 8, 9, 10, 99]
    },
    'output': [3, 5, 6, 8, 9, 10, 99]
}
tests.append(test)
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
# A list containing repeating elements
test = {
    'input': {
        'nums': [5, -12, 2, 6, 1, 23, 7, 7, -12, 6, 12, 1, -243, 1, 0]
    },
    'output': [-243, -12, -12, 0, 1, 1, 1, 2, 5, 6, 6, 7, 7, 12, 23]
}
tests.append(test)
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
# An empty list 
test = {
    'input': {
        'nums': []
    },
    'output': []
}
tests.append(test)
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
# A list containing just one element
test = {
    'input': {
        'nums': [23]
    },
    'output': [23]
}
tests.append(test)
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
# A list containing one element repeated many times
test = {
    'input': {
        'nums': [42, 42, 42, 42, 42, 42, 42]
    },
    'output': [42, 42, 42, 42, 42, 42, 42]
}
tests.append(test)
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
tests
`,
      output: "",
      isError: false
    },
    userCells: []
  },

  {
    id: "b11",
    title: "Bubble Sort Implementation",
    defaultCell: {
      id: "b11-default",
      code: `
def bubble_sort(nums):
    # Create a copy of the list, to avoid changing it
    nums = list(nums)
    n=len(nums)
    
    # 4. Repeat the process n-1 times
    for _ in range(n-1):
        
        # 1. Iterate over the array (except last element)
        for i in range(n - 1):
            
            # 2. Compare the number with  
            if nums[i] > nums[i+1]:
                
                # 3. Swap the two elements
                nums[i], nums[i+1] = nums[i+1], nums[i]
    return nums      
`,
      output: "",
      isError: false
    },
    userCells: []
  },

  {
    id: "b12",
    title: "Test Bubble Sort",
    defaultCell: {
      id: "b12-default",
      code: `

for i, test in enumerate(tests):
    print(f"-----case {i}----")
    nums = test["input"]["nums"]
    expected = test["output"]
    result = bubble_sort(nums)

    print("nums:", nums)
    print("result:",result)
    print("successfully tested?", result == expected)
`,
      output: "",
      isError: false
    },
    userCells: []
  },

  {
    id: "b13",
    title: "Insertion Sort Implementation",
    defaultCell: {
      id: "b13-default",
      code: `
def insertion_sort(nums):
    nums = list(nums)

    for i in range(1, len(nums)):
        key = nums[i]
        j = i - 1

        while j >= 0 and nums[j] > key:
            nums[j + 1] = nums[j]
            j -= 1

        nums[j + 1] = key

    return nums

`,
      output: "",
      isError: false
    },
    userCells: []
  },

  {
    id: "b14",
    title: "Merge Sort Implementation",
    defaultCell: {
      id: "b14-default",
      code: `
def merge(nums1, nums2):
    merged = []

    i, j = 0, 0

    while i < len(nums1) and j < len(nums2):

        if nums1[i] <= nums2[j]:
            merged.append(nums1[i])
            i += 1
        else:
            merged.append(nums2[j])
            j += 1

    while i < len(nums1):
        merged.append(nums1[i])
        i += 1

    while j < len(nums2):
        merged.append(nums2[j])
        j += 1

    return merged


def merge_sort(nums):

    if len(nums) <= 1:
        return nums

    mid = len(nums) // 2

    left = nums[:mid]
    right = nums[mid:]

    left_sorted = merge_sort(left)
    right_sorted = merge_sort(right)

    return merge(left_sorted, right_sorted)

`,
      output: "",
      isError: false
    },
    userCells: []
  },

  {
    id: "b15",
    title: "Test Merge Sort",
    defaultCell: {
      id: "b15-default",
      code: `
for i, test in enumerate(tests):
    print(f"-----case {i}----")
    nums = test["input"]["nums"]
    expected = test["output"]
    result = merge_sort(nums)

    print("nums:", nums)
    print("result:",result)
    print("successfully tested?", result == expected) 
`,
      output: "",
      isError: false
    },
    userCells: []
  },

  {
    id: "b16",
    title: "Quick Sort Implementation",
    defaultCell: {
      id: "b16-default",
      code: `

def partition(arr, low, high):

    pivot = arr[high]      # Last element as pivot
    i = low - 1

    for j in range(low, high):

        if arr[j] <= pivot:
            i += 1

            arr[i], arr[j] = arr[j], arr[i]

    arr[i + 1], arr[high] = arr[high], arr[i + 1]

    return i + 1


def quick_sort(arr, low, high):

    if low < high:

        pivot = partition(arr, low, high)

        quick_sort(arr, low, pivot - 1)

        quick_sort(arr, pivot + 1, high)

    
`,
      output: "",
      isError: false
    },
    userCells: []
  },

  {
    id: "b17",
    title: "Test Quick Sort",
    defaultCell: {
      id: "b17-default",
      code: `
for i, test in enumerate(tests):
    print(f"-----case {i}----")
    nums = list(test["input"]["nums"])
    expected = test["output"]
    quick_sort(nums, 0, len(nums) - 1)

    print("nums:", nums)
    print("successfully tested?", nums == expected) 
`,
      output: "",
      isError: false
    },
    userCells: []
  }
];
