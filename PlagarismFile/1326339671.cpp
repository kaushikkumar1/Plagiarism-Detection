#include <bits/stdc++.h>
using namespace std;

int main() {
    // your code goes here
    int t;cin>>t;
    while(t--)
    {
        long long n;cin>>n;
        struct timings{
            string start;
            string end;
        };
        timings a[n];
        timings currentinterval=a[0];
        int curoverlap=1;
        int maxoverlap=INT_MIN;
        for(long long i=0;i<n;i++)
        {
            cin>>a[i].start; cin>>a[i].end;
        }
        for(long long i=0;i<n;i++)
        {
            if(a[i].start<currentinterval.end)
            {
                curoverlap++;
                maxoverlap=max(maxoverlap,curoverlap);
                currentinterval.end=max(a[i].end,currentinterval.end);
                
            }
            else
            {
                curoverlap=1;
                currentinterval=a[i];
            }
        }
        cout<<maxoverlap;
        cout<<"\n";
    }
    return 0;
}