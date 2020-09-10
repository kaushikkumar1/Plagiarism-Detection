#include <cmath>
#include <cstdio>
#include <vector>
#include <iostream>
#include <algorithm> 
using namespace std; 
int findPlatform(int a[], int b[], int n)
{
    int plat_needed = 1, result = 1; 
    int i = 1, j = 0; 
    for (i = 0; i < n; i++) { 
        plat_needed = 1; 

        for (j = i + 1; j < n; j++) { 
            if ((a[i] >= a[j] && a[i] <= b[j]) || 
        (a[j] >= a[i] && a[j] <= b[i])) 
                plat_needed++; 
        }
        result = max(result, plat_needed); 
    } 

    return result; 
} 
int main() 
{ 
     int t;cin>>t;
    int a[100001];
    int i,j,b[100001],d[100001];
    for(i=0;i<t;i++)
    {
        int n;cin>>n;
        for(j=0;j<n;j++)
            cin>>a[j];
        for(j=0;j<n;j++)
            cin>>b[j];
        int c=findPlatform(a,b,n);
        d[i]=c;
    }
    for(i=0;i<t;i++)
        cout<<d[i]<<"\n";
    return 0; 
} 
