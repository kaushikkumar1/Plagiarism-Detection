#include <cmath>
#include <cstdio>
#include <vector>
#include <iostream>
#include <algorithm>
using namespace std;
#define ll long long
struct ti{
        ll start;
        ll end;
    };
int main() {
    ll t;cin>>t;
    while(t--)
    {
    
        ll n;
        cin>>n;
        ti a[n];
        for(ll i=0;i<n;i++)
            cin>>a[i].start;
         for(ll i=0;i<n;i++)
            cin>>a[i].end;
     ti ci=a[0];
        ll co=1,maxo=0;
        for(ll i=1;i<n;i++)
        {
            if(a[i].start<ci.end)
            {
                co++;
                maxo=max(maxo,co);
                ci.end=max(a[i].end,ci.end);
            }
            else
            {
                co=1;
                ci=a[i];
            }
            
        }
        if(maxo!=0)
     cout<<maxo<<"\n";
        else
            cout<<"1\n";
        
    }
    /* Enter your code here. Read input from STDIN. Print output to STDOUT */   
    return 0;
}
