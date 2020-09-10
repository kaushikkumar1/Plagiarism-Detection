#include<bits/stdc++.h>

using namespace std;

typedef long long int ll;

#define FASTIO ios_base::sync_with_stdio(false); cin.tie(0); cout.tie(0);

int main(){

    FASTIO;
    ll t;cin>>t;
    while(t--)
    {
        ll n;cin>>n;
        ll a[n],b[n];
        for(ll i=0;i<n;i++)
        cin>>a[i];
        for(ll i=0;i<n;i++)
        cin>>b[i];
        
    sort(a,a+n); 
    sort(b,b+n); 
    
    ll ans=1,c=1;
    ll i=1,j=0; 

    while(i<n&&j<n) 
    { 
        if (a[i]<=b[j]) 
        { 
            c++; 
            i++; 
        } 
        else if(a[i]>b[j]) 
        { 
            c--; 
            j++; 
        } 
        if (c>ans) 
            ans=c; 
    } 
    cout<<ans<<"\n";
    }
   // YOUR CODE WILL GO HERE
    return 0;
}
