// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler
    
console.log("Welcome to Programiz!");

// paramater_reduce = lambda operation = lambda a,b : a*b: lambda *args: print(reduce((lambda x,y: operation(x,y)), args)) if type(args[0]) != list else print(reduce((lambda x,y: operation(x,y)), args[0]))
Array.prototype.sample = function(){
  return this[Math.floor(Math.random()*this.length)];
}

parameter_reduce = (operation = (a,b) => a*b) => (...args) => (typeof(args[0]) !== 'object') ? console.log(args.reduce((x,y) => operation(x,y))) : console.log(args[0].reduce((x,y) => operation(x,y)))

lmoa = parameter_reduce()
lmoa2 = parameter_reduce((a,b)=>a*a*b)

lmoa(8,9,10)
lmoa2([8,9,10])

parameter_reduce()(1,2,3,4,5)
parameter_reduce()([1,2,3,4,5])

parameter_reduce = (operation = (a,b) => a*b) => (...args) => (typeof(args[0]) !== 'object') ? console.log(args.reduce((x,y) => operation(x,y))) : console.log(args[0].reduce((x,y) => operation(x,y)))
dement = (...args) => (...params) => parameter_reduce(args[Math.floor(Math.random()*args.length)])(...params)
final_dement = (iterations) => [...Array(iterations).keys()].map((i) => dement((a,b)=>a+b, (a,b)=>a*b, (a,b)=>a-b, (a,b)=>a/b)(1,2,3,4,5))

final_dement(10)
