#include<bits/stdc++.h>
using namespace std;
#define FIO ios_base::sync_with_stdio(false);cin.tie(0);cout.tie(0);
typedef long long ll;
struct time{
    int st;
    int en;
};

int main()
{
    FIO;
    int t;
    cin>>t;
    while(t--)
    {
        int n;cin>>n;
        time a[n];
        for(int i=0;i<n;i++)
        {
            cin>>a[i].st;
        }
        for(int i=0;i<n;i++)
        {
            cin>>a[i].en;
        }
        sort(v.begin(),v.end());
        time cur=a[0];
        int curover=1,mx=INT_MIN;
        for(int i=1;i<n;i++)
        {
            if(a[i].st<cur.end)
            {
             curover++;
             mx=max(mx,curover);
                 cur.en=max(a[i].end,cur.en);
            }
            else
            {
                curover=1;
                cur.en=a[i];
            }
            
        }
        cout<<mx<<"\n";
    }
}