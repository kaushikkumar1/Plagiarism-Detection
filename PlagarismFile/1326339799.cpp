#include <bits/stdc++.h> 
using namespace std; 
  

void maxProfit(vector<int> profit, 
               vector<int> weight, int N) 
{ 
    int numOfElements = profit.size(); 
    int i; 
    multimap<double, int> ratio; 
  
    double max_profit = 0; 
    for (i = 0; i < numOfElements; i++) { 
  
       
        ratio.insert(make_pair( (double)profit[i] / weight[i], i)); 
    } 
  
    
    multimap<double, int>::reverse_iterator it; 
    for (it = ratio.rbegin(); it != ratio.rend(); 
         it++) { 
  
       
        double fraction = (double)N / weight[it->second]; 
  
        
        if (N >= 0 
            && N >= weight[it->second]) { 
  
           
            max_profit += profit[it->second]; 
  
            
            N -= weight[it->second]; 
        } 
  
         
        else if (N < weight[it->second]) { 
            max_profit += fraction 
                          * profit[it->second]; 
            break; 
        } 
    } 
      printf("%.2lf\n",max_profit); 
} 

int main() 
{ 
    int t;
    cin>>t;
    while(t--)
    {
    int size,N; 
    cin>>size>>N;
        
    vector<int> profit(size), weight(size); 
  
    for(int i=0;i<size;i++)
        cin>>profit[i];
        for(int i=0;i<size;i++)
            cin>>weight[i];
    maxProfit(profit, weight, N); 
}}