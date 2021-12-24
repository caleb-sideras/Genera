# Online Python compiler (interpreter) to run Python online.
# Write Python 3 code in this online editor and run it.
from functools import reduce
import math
import random
print("Hello world")


def multiply(*args):
    sum = 1
    for elt in args:
        sum *= elt
    return sum
    
# print(reduce((lambda x,y: x*y), [1,2,3,4,5]) == math.factorial(5))    

add = lambda a,b : a+b
subtract = lambda a,b : a-b
multiply = lambda a,b : a*b
divide = lambda a,b : a/b

paramater_reduce = lambda operation = lambda a,b : a*b: lambda *args: print(reduce((lambda x,y: operation(x,y)), args)) if type(args[0]) != list else print(reduce((lambda x,y: operation(x,y)), args[0]))

def param_reduce_other(operation = add):
    def inner(*args):
        if type(args[0]) != list:
            print(reduce((lambda x,y: operation(x,y)), args))
        else:
            print(reduce((lambda x,y: operation(x,y)), args[0]))
    
    return inner
    

test_add = paramater_reduce(add)
test_reduce = paramater_reduce(multiply)

param_reduce_other(multiply)(5,6,7,8)
param_reduce_other()([5,6,7,8])

test_add(2,4,6)
test_reduce(2,4,6)

# print(paramater_reduce(add)([1,2,3,4,5]))
# print(paramater_reduce(add)(1,2,3,4,5))
# print(paramater_reduce()([1,2,3,4,5]))
# print(paramater_reduce()(1,2,3,4,5))

paramater_reduce = lambda operation = lambda a,b : a*b: lambda *args: print(reduce((lambda x,y: operation(x,y)), args)) if type(args[0]) != list else print(reduce((lambda x,y: operation(x,y)), args[0]))
dement = lambda *args: lambda *params: paramater_reduce(random.choice(args))(*params)
final_dement = lambda iterations : [dement(lambda a,b : a+b, lambda a,b : a-b, lambda a,b : a*b, lambda a,b : a/b)(1,2,3,4,5) for i in range(iterations)]

final_dement(10)


        