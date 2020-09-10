
#include <bits/stdc++.h>
using namespace std;
int main() {
    /* Enter your code here. Read input from STDIN. Print output to STDOUT */   
    int t;cin>>t;
    while(t--)
    {
        int n;cin>>n;
        int s[n],e[n];
        for(int i=0;i<n;i++)
            cin>>s[i];
        for(int i=0;i<n;i++)
            cin>>e[i];
        sort(s,s+n);sort(e,e+n);
        int p=1,q=0,curr=1,ans=1;
        while(p<n && q<n)
        {
            if(s[p]<=e[q])
            {
                curr++;
                p++;
            }
            else if(s[p]>e[q])
            {
                curr--;
                q++;
            }
            if(curr > ans)
                ans=curr;
        }
        cout<<ans<<'\n';
    }
    return 0;
}
