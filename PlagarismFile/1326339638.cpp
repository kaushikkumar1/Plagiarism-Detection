#include<bits/stdc++.h>
using namespace std;
typedef long long ll;
ll solve(ll a[], ll w[], ll n) 
{ 
    ll tmp= 1, res = 1; 
    for (ll i = 0; i < n; i++) { 
        tmp = 1; 
  
        for (ll j = i + 1; j < n; j++) { 
            if ((a[i] >= a[j] && a[i] <= w[j]) ||  
           (a[j] >= a[i] && a[j] <= w[i])) 
                tmp++; 
        } 
        res = max(res, tmp); 
    } 
    return res; 
} 
int main() {
    int t=0;cin>>t;
    while(t--){
        ll n;cin>>n;
        ll a[n],w[n];
        for(ll i=0;i<n;i++)
            cin>>a[i];
        for(ll i=0;i<n;i++)
            cin>>w[i];
        cout<<solve(a,w,n)<<"\n";
    }
    return 0;
}