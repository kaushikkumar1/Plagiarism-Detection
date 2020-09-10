#include<bits/stdc++.h>
using namespace std;
#define ll long long 
int main()
 {
    ll t,n,m,k,i,j;
    cin>>t;
    while(t--)
    {
        cin>>n;
        ll a[2*n];
        vector<pair<ll,char>> v;
        for(i=0;i<n;i++)
        {
            cin>>a[i];
            v.push_back(make_pair(a[i],'a'));
        }
        for(i=n;i<2*n;i++)
        {
            cin>>a[i];
            v.push_back(make_pair(a[i],'d'));
        }
        sort(v.begin(),v.end());
        ll ans=0,sum=0;
        for(i=0;i<2*n;i++)
        {
            if(v[i].second=='a')
            sum++;
            else
            sum--;
            if(sum>ans)
            ans++;
        }
        cout<<ans<<endl;
    }
    return 0;
}
