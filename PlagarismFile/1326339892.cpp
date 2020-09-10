
/* A Naive recursive implementation of 
 0-1 Knapsack problem */
#include <bits/stdc++.h> 
using namespace std; 
  
// A utility function that returns 
// maximum of two integers 
int max(int a, int b) { return (a > b) ? a : b; } 
  
// Returns the maximum value that 
// can be put in a knapsack of capacity W 
int knapSack(int W, int wt[], int val[], int n) 
{ 
  
    // Base Case 
    if (n == 0 || W == 0) 
        return 0; 
  
    
    if (wt[n] > W) 
        return knapSack(W, wt, val, n - 1); 
  
    // Return the maximum of two cases: 
    // (1) nth item included 
    // (2) not included 
    else
        return max( 
            val[n] + knapSack(W - wt[n],  
                                    wt, val, n - 1), 
            knapSack(W, wt, val, n - 1)); 
} 
  
// Driver code 
int main() 
{ 
    int t;cin>>t;
    while(t--){
            int n,W; 
            cin>>n;
            cin>>W;

    int val[n]; 
    int wt[n];
    for(int i=0;i<n;i++)
    cin>>val[i];
        for(int i=0;i<n;i++)
       cin>> wt[i];

    
    //int n = sizeof(val) / sizeof(val[0]); 
    cout << knapSack(W, wt, val, n)<<"\n"; 
    }
    return 0; 
} 
  
// This code is contrib