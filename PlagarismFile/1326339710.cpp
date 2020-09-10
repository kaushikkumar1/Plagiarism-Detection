#include <cmath>
#include <cstdio>
#include <vector>
#include <iostream>
#include <algorithm>
using namespace std;


int main() {
    int t;cin>>t;
    while(t--)
    {
        int n,i,j;cin>>n;
        int a[n],d[n];
        for(i=0;i<n;i++)
            cin>>a[i];
        for(i=0;i<n;i++)
            cin>>d[i];
        int p=1,res=1;
        sort(a,a+n);
        sort(d,d+n);
        i=0;
        j=1;
        while(i < n && j < n)
        {
            if(a[j]<=d[i]){
                p++;
                j++;
            }
            else if(a[j] > d[i])
            {
                p--;
                i++;
            }
            res=max(res,p);
        }
        cout<<res<<"\n";
    }
    return 0;
}
