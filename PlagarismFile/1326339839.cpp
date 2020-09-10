#include<bits/stdc++.h>
using namespace std;
#define FASTIO ios_base::sync_with_stdio(false);cin.tie(0);cout.tie(0);

int main() {
    FASTIO;
    int t; cin>>t;
    while(t--)
    {
        int n; cin>>n;
        
        pair <string,string> c;
        vector <string> s(n);
        for(int i=0;i<n;i++)
            cin>>s[i];
        vector <string> e(n);
        for(int i=0;i<n;i++)
            cin>>e[i];
       vector <pair <string,string> > t;
        for(int i=0;i<n;i++)
           t.push_back({s[i],e[i]});
        sort(t.begin(),t.end());
        
        c.first=t[0].first;
        c.second=t[0].second;
        int count=0;
        int op=INT_MIN;
        for(int i=1;i<n;i++)
        {
            if(t[i].first<=c.second)
            {
                count++;
                op=max(op,count);
                c.second=max(t[i].second,c.second);
            }
            else
            {
                count=1;
                c.first=t[i].first;
                c.second=t[i].second;
            }
        }
        cout<<count<<"\n";
        
    }
    return 0;
}
