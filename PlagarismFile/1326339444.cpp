#include <cmath>
#include <cstdio>
#include <vector>
#include <iostream>
#include <algorithm>
using namespace std;
#include <algorithm> 
#include <iostream> 
  #include<bits/stdc++.h>
using namespace std; 
  
 
int p(int ar[], int dp[], int n) 
{ 
    
    sort(ar, ar + n); 
    sort(dp, dp + n); 
  
    
    int ans = 1, res= 1; 
    int i = 1, j = 0; 
  
    
    while (i < n && j < n) { 
        
        if (ar[i] <= dp[j]) { 
            ans++; 
            i++; 
        } 
  
        
        else if (ar[i] > dp[j]) { 
            ans--; 
            j++; 
        } 
  
        
        if (ans > res) 
            res = ans; 
    } 
  
    return res; 
} 

int main() {
    /* Enter your code here. Read input from STDIN. Print output to STDOUT */
    long int t;
     cin>>t;
     while(t--)
     {
          int n;
         cin>>n;
         int a[n];
         int dp[n];
          for(int i=0;i<n;i++)
          {
              cin>>a[i];
          }
         for(int i=0;i<n;i++)
         {
             cin>>dp[i];
         }
        cout<<p(a,dp,n)<<"\n";
     }
    return 0;
}
