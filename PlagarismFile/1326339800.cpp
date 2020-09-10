#include<bits/stdc++.h>
using namespace std;
#define FASTIO ios_base::sync_with_stdio(0);cin.tie(0);cout.tie(0);
bool sort(int x,int y)
{
    return x<=y;
}

struct time
{
    int start;
    int end;
};

int main()
{ 
    FASTIO;
    int t;
    cin>>t;
    while(t--)
    {
        int n;
        cin>>n;
        struct time a[n];
        for(int i=0;i<n;i++)
        {
            int s;
            cin>>s;
            a[i].start=s;
        }
        for(int i=0;i<n;i++)
        {
            int e;
            cin>>e;
            a[i].end=e;
        }
        for(int i=0;i<n-1;i++)
        sort(a[i].start,a[i+1].start);
        struct time currentInterval=a[0];
        int currentOverlap=0;
        int maxOverlap=INT_MIN;
        for(int i=0;i<n;i++)
        {
            if(a[i].start<currentInterval.end)
            {
                currentOverlap++;
                maxOverlap=max(maxOverlap,currentOverlap);
                currentInterval.end=max(a[i].end,currentInterval.end);
            }
            else
            {
                currentOverlap=1;
                currentInterval=a[i];
            }
        }
        cout<<maxOverlap<<"\n";
    }
}