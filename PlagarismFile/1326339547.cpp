#include <bits/stdc++.h>
using namespace std;


int main() {
    int t; cin>>t;
    while(t--)
    {
        int n,i,j; cin>>n;
        int a[n] , d[n];
        int p=1, res=1;
        for(i=0 ;i<n;i++)
            cin>>a[i];
        for(i=0 ;i<n;i++)
            cin>>d[i];
        for(i=0 ;i<n;i++)
        {
            p=1;
            for(j=i+1; j<n; j++)
            {
                if ( (a[i] >= a[j] && a[i] <= d[j]) ||  (a[j] >= a[i] && a[j] <= d[i])) 
                    p++;
            }
            
            res = max(res, p);
        }
        
        cout<<res<<"\n";
            
        
    }
    /* Enter your code here. Read input from STDIN. Print output to STDOUT */   
    return 0;
}
