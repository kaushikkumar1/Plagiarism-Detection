#include <cmath>
#include <cstdio>
#include <vector>
#include <iostream>
#include <algorithm>
using namespace std;

int minPlatform(int a[], int d[], int n) 
{  
    int p[2361]={}; 
    int cnt=1; 
    for (int i=0;i<n;i++)
    { 
        ++p[a[i]];
        --p[d[i]+1]; 
    } 
    for(int i=1;i<2361;i++) 
    {
        p[i]=p[i]+p[i-1];  
        cnt=max(cnt, p[i]); 
    } 
    return cnt; 
}
int main() {
    int t;cin>>t;
    while(t--){
        int n;cin>>n;
        int a[n],d[n];
        for(int i=0;i<n;i++) cin>>a[i];
        for(int i=0;i<n;i++) cin>>d[i];
        cout<<minPlatform(a,d,n)<<"\n";
    }
    /* Enter your code here. Read input from STDIN. Print output to STDOUT */   
    return 0;
}
