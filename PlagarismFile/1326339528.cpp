#include<bits/stdc++.h>
using namespace std;
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
    ios::sync_with_stdio(false);cin.tie(0);cout.tie(0);
    int t;
    cin>>t;
    while(t--)
    {
    int n;
    cin>>n;
    struct time a[n];
    int s,e;
    for(int i=0;i<n;i++)
    {
        cin>>s;
        a[i].start=s;
    }
    for(int i=0;i<n;i++)
    {
        cin>>e;
        a[i].end=e;
    }
    for(int i=0;i<n;i++)
    sort(a[i].start,a[i-1].start);
    struct time currentInterval=a[0];
    int currentOverlap=0;
    int maxOverlap=INT_MIN;
    for(int i=0;i<n;i++)
    {
        if(a[i].start<currentInterval.end)
        {
            currentOverlap++;
            maxOverlap=max(    maxOverlap,currentOverlap);
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