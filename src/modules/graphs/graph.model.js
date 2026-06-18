export const sections = [
{
id: "b1",
title: "BFS Function Setup",
defaultCell: {
id: "b1-default",
code: `
tests = []
`,
output: "",
isError: false
},
userCells: []
},

{
id: "b2",
title: "Source connected to all vertices",
defaultCell: {
id: "b2-default",
code: `
test = {
"input": {
"n": 5,
"a": [
[0,1,1,1,1],
[0,0,0,0,0],
[0,0,0,0,0],
[0,0,0,0,0],
[0,0,0,0,0]
],
"source": 0,
"t": [],
"s": [0,0,0,0,0]
},
"output": [0,1,2,3,4]
}
tests.append(test)
`,
output:"",
isError:false
},
userCells:[]
},

{
id:"b3",
title:"Source is first vertex",
defaultCell:{
id:"b3-default",
code:`
test = {
"input":{
"n":4,
"a":[
[0,1,0,0],
[0,0,1,0],
[0,0,0,1],
[0,0,0,0]
],
"source":0,
"t":[],
"s":[0,0,0,0]
},
"output":[0,1,2,3]
}
tests.append(test)
`,
output:"",
isError:false
},
userCells:[]
},

{
id:"b4",
title:"Source is last vertex",
defaultCell:{
id:"b4-default",
code:`
test = {
"input":{
"n":4,
"a":[
[0,1,0,0],
[0,0,1,0],
[0,0,0,1],
[0,0,0,0]
],
"source":3,
"t":[],
"s":[0,0,0,0]
},
"output":[3]
}
tests.append(test)
`,
output:"",
isError:false
},
userCells:[]
},

{
id:"b5",
title:"Single vertex graph",
defaultCell:{
id:"b5-default",
code:`
test = {
"input":{
"n":1,
"a":[[0]],
"source":0,
"t":[],
"s":[0]
},
"output":[0]
}
tests.append(test)
`,
output:"",
isError:false
},
userCells:[]
},

{
id:"b6",
title:"Disconnected graph",
defaultCell:{
id:"b6-default",
code:`
test = {
"input":{
"n":4,
"a":[
[0,1,0,0],
[0,0,0,0],
[0,0,0,1],
[0,0,0,0]
],
"source":0,
"t":[],
"s":[0,0,0,0]
},
"output":[0,1]
}
tests.append(test)
`,
output:"",
isError:false
},
userCells:[]
},

{
id:"b7",
title:"Empty graph",
defaultCell:{
id:"b7-default",
code:`
test = {
"input":{
"n":0,
"a":[],
"source":None,
"t":[],
"s":[]
},
"output":[]
}
tests.append(test)
`,
output:"",
isError:false
},
userCells:[]
},

{
id:"b8",
title:"Graph with cycle",
defaultCell:{
id:"b8-default",
code:`
test = {
"input":{
"n":3,
"a":[
[0,1,0],
[0,0,1],
[1,0,0]
],
"source":0,
"t":[],
"s":[0,0,0]
},
"output":[0,1,2]
}
tests.append(test)
`,
output:"",
isError:false
},
userCells:[]
},

{
id:"b9",
title:"Isolated source",
defaultCell:{
id:"b9-default",
code:`
test = {
"input":{
"n":3,
"a":[
[0,0,0],
[0,0,1],
[0,0,0]
],
"source":0,
"t":[],
"s":[0,0,0]
},
"output":[0]
}
tests.append(test)
`,
output:"",
isError:false
},
userCells:[]
},

{
id:"b10",
title:"Multiple paths",
defaultCell:{
id:"b10-default",
code:`
test = {
"input":{
"n":4,
"a":[
[0,1,1,0],
[0,0,0,1],
[0,0,0,1],
[0,0,0,0]
],
"source":0,
"t":[],
"s":[0,0,0,0]
},
"output":[0,1,2,3]
}
tests.append(test)
`,
output:"",
isError:false
},
userCells:[]
},

{
id:"b11",
title:"Fully connected graph",
defaultCell:{
id:"b11-default",
code:`
test = {
"input":{
"n":4,
"a":[
[0,1,1,1],
[1,0,1,1],
[1,1,0,1],
[1,1,1,0]
],
"source":0,
"t":[],
"s":[0,0,0,0]
},
"output":[0,1,2,3]
}
tests.append(test)
`,
output:"",
isError:false
},
userCells:[]
},

{
id:"b12",
title:"Linear graph",
defaultCell:{
id:"b12-default",
code:`
test = {
"input":{
"n":5,
"a":[
[0,1,0,0,0],
[0,0,1,0,0],
[0,0,0,1,0],
[0,0,0,0,1],
[0,0,0,0,0]
],
"source":0,
"t":[],
"s":[0,0,0,0,0]
},
"output":[0,1,2,3,4]
}
tests.append(test)
`,
output:"",
isError:false
},
userCells:[]
},

{
id:"b13",
title:"Invalid source",
defaultCell:{
id:"b13-default",
code:`
test = {
"input":{
"n":3,
"a":[
[0,1,0],
[0,0,1],
[0,0,0]
],
"source":10,
"t":[],
"s":[0,0,0]
},
"output":[]
}
tests.append(test)
`,
output:"",
isError:false
},
userCells:[]
},

{
id:"b14",
title:"code",
defaultCell:{
id:"b14-default",
code:`
def BFS_traversal(n, a, source, t, s):

    # Handle empty graph
    if n == 0:
        return []

    # Handle invalid source
    if source is None or source < 0 or source >= n:
        return []

    q = []
    traversal = []

    s[source] = 1
    q.append(source)

    while len(q) > 0:

        u = q.pop(0)

        traversal.append(u)

        for v in range(n):

            if a[u][v] == 1 and s[v] == 0:

                s[v] = 1
                q.append(v)

                t.append((u, v))

    return traversal
`,
output:"",
isError:false
},
userCells:[]
},

{
id:"b15",
title:"Invalid source",
defaultCell:{
id:"b15-default",
code:`
for test in tests:

    n = test["input"]["n"]
    a = test["input"]["a"]
    source = test["input"]["source"]
    t = test["input"]["t"]
    s = test["input"]["s"]

    result = BFS_traversal(
        n,
        a,
        source,
        t,
        s
    )

    print(result == test["output"])
`,
output:"",
isError:false
},
userCells:[]
},
]