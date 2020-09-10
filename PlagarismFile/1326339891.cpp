#include <cmath>
#include <cstdio>
#include <vector>
#include <iostream>
#include <algorithm>
#include<bits/stdc++.h>
#define ll long long
using namespace std;

ll find(ll arr[], ll dep[], ll n) 
{ 
    ll plat_needed = 1, result = 1; 
    for (ll i = 0; i < n; i++) { 
        plat_needed = 1; 
  
        for (ll j = i + 1; j < n; j++) { 
            if ((arr[i] >= arr[j] && arr[i] <= dep[j]) ||  
           (arr[j] >= arr[i] && arr[j] <= dep[i])) 
                plat_needed++; 
        } 
        result = max(result, plat_needed); 
    } 
    return result; 
} 
int main() {
    /* Enter your code here. Read input from STDIN. Print output to STDOUT */   
    int t=0;
    cin>>t;
    while(t--){
        ll n=0;
        cin>>n;
        ll a[n],dep[n];
        for(ll i=0;i<n;i++){
            cin>>a[i];
        }
        for(ll i=0;i<n;i++){
            cin>>dep[i];
        }
        cout<<find(a,dep,n)<<"\n";
    }
    return 0;
}