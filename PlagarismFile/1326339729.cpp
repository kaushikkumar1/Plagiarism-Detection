#include<bits/stdc++.h>
using namespace std;
#define fastio ios::sync_with_stdio(false);cin.tie(0);cout.tie(0);

long int platform(long int a[],long int d[],long int n)
{
    long int p=1,r=1;
    long int i,j;
    for(i=0;i<n;i++){
        p=1;
        for(j=i+1;j<n;j++){
            if((a[i]>=a[j] && a[i]<=d[j]) || (a[j]>=a[i] && a[j]<d[i]) )
                p++;
        }
        r=max(r,p);
    }
    return r;
}

int main() 
{
    fastio;
    int t;cin>>t;
    while(t--){
        long int n;cin>>n;
        long int a[n],d[n];
        long int i;
        for(i=0;i<n;i++)
            cin>>a[i];
        for(i=0;i<n;i++)
            cin>>d[i];
        cout<<platform(a,d,n)<<"\n";
    }
    /* Enter your code here. Read input from STDIN. Print output to STDOUT */   
    return 0;
}
