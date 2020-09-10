#include <bits/stdc++.h> 
using namespace std; 
int solve(long long int a[], long long int d[], long long int n)
{ 
    int p = 1, res = 1; 
    for (int i = 0; i < n; i++) { 
        p = 1; 
  
        for (int j = i + 1; j < n; j++) { 
            if ((a[i] >= a[j] && a[i] <= d[j]) ||  
           (a[j] >= a[i] && a[j] <= d[i])) 
                p++; 
        } 
        res = max(res, p); 
    } 
  
    return res; 
} 
int main() 
{ 
    int t;
    cin>>t;
    while(t--){
        long long int n;
        cin>>n;
        long long int a[n],d[n];
        for(int i=0;i<n;i++)
        {
            cin>>a[i];
        }
        for(int i=0;i<n;i++)
        {
            cin>>d[i];
        }
    cout<< solve(a, d, n)<<"\n"; 
    }
    
}
