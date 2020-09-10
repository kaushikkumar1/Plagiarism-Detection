#include<bits/stdc++.h>
using namespace std;


int main() {
    int t;cin>>t;
    while(t--)
    {
        int n;cin>>n;
        vector<pair<int,int>>a(n);
    for(int i=0;i<n;i++)
    {
        int x;cin>>x;
        a[i].first=x;
    }
          for(int i=0;i<n;i++)
    {
        int x;cin>>x;
        a[i].second=x;
    }
    sort(a.begin(),a.end());
    pair<int,int> c=a[0];
    int s=1;
    int m=1;
    for(int i=1;i<n;i++)
    {
        if(a[i].second<c.second)
        {
            c.second=max(a[i].second,c.second);
            s++;
        }
        else
        {  m=max(m,s);
            c=a[i];
            s=1;
        }
        
    }
        
        cout<<m<<"\n";
        
    }
    
    
    /* Enter your code here. Read input from STDIN. Print output to STDOUT */   
    return 0;
}
