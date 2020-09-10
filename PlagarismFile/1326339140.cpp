#include <algorithm> 
#include <iostream> 
#include<bits/stdc++.h>
using namespace std; 
typedef long long ll;

ll findPlatform(ll arr[], ll dep[], ll n) 
{ 
    sort(arr, arr + n); 
    sort(dep, dep + n); 
  

    ll plat_needed = 1, result = 1; 
    ll i = 1, j = 0; 

    while (i < n && j < n) { 
        if (arr[i] <= dep[j]) { 
            plat_needed++; 
            i++; 
        } 
  
        else if (arr[i] > dep[j]) { 
            plat_needed--; 
            j++; 
        } 
  
        if (plat_needed > result) 
            result = plat_needed; 
    } 
  
    return result; 
} 
  
// Driver program to test methods of graph class 
int main() 
{ 
    ll t;
    cin>>t;
    while(t--)
    {
        ll n;
        cin>>n;
        ll arr[n];
        ll dep[n];
        for(ll i=0;i<n;i++)
        {
            cin>>arr[i];
        }
        for(ll i=0;i<n;i++)
        {
            cin>>dep[i];
        }
        ll ans;
        ans=findPlatform(arr,dep,n);
        cout<<ans<<"\n";
        
    }
    
    return 0; 
} 