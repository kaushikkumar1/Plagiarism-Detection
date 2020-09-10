class ItemValue: 
    def __init__(self, wt, val, ind): 
        self.wt = wt 
        self.val = val 
        self.ind = ind 
        self.cost = val // wt 
  
    def __lt__(self, other): 
        return self.cost < other.cost 
class FractionalKnapSack: 
    def getMaxValue(wt, val, capacity): 
        iVal = [] 
        for i in range(len(wt)): 
            iVal.append(ItemValue(wt[i], val[i], i)) 
        iVal.sort(reverse = True) 
  
        totalValue = 0
        for i in iVal: 
            curWt = int(i.wt) 
            curVal = int(i.val) 
            if capacity - curWt >= 0: 
                capacity -= curWt 
                totalValue += curVal 
            else: 
                fraction = capacity / curWt 
                totalValue += curVal * fraction 
                capacity = int(capacity - (curWt * fraction)) 
                break
        return totalValue 
if __name__ == "__main__": 
    t=int(input())
    for i in range(t):
        n,capacity=map(int,input().split())
        val = list(map(int,input().split()))
        wt = list(map(int,input().split()))
        maxValue = FractionalKnapSack.getMaxValue(wt, val, capacity) 
        print('%.2f'%(maxValue)) 