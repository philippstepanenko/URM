# URM
Unlimited Register Machine ([link](http://urms.ml)).

A particular type of theoretical computer, with infinitely many memory cells, called registers, and formal rules to determine the machine's behavior based on their contents.

### Commands
There are only 4 commands:
- **Zero**: Z x
- **Successor**: S x 
- **Transfer**: T x y
- **Jump**: J x y l

### Example commands
1. **Set to zero value of register (R1).**
```
Z 1
```
2. **Add 1 (R1).**
```
S 1
```
3. **Copy a value from R1 to R2.**
```
T 1 2
```
4. **If R1 = R2, then go to line 999.**
```
J 1 2 999
```

### Example program
This program calculates the sum of two numbers (R1 and R2).
The result will be stored in R1.

```
Z 3
J 2 3 999
S 1
S 3
J 1 1 2
```