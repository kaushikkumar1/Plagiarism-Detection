#include<bits/stdc++.h>
using namespace std;

bool cmp(pair<int,int>a ,pair<int,int> b)
{
    return(a.second<b.second);
}
int main() {
    /* Enter your code here. Read input from STDIN. Print output to STDOUT */ 
    int n;
    cin>>n;
    while(n--)
    {
        int n;
        cin>>n;
        vector<pair<int,int>> a(n);
        for(int i=0;i<n;i++)cin>>a[i].first;
        for(int i=0;i<n;i++)cin>>a[i].second;
        sort(a.begin(),a.end(),cmp);
        pair<int,int> cur=a[0];
        int c=1,m=1;
        for(int i=1;i<a.size();i++)
        {
            if(a[i].first<cur.second)
            {
                cur.second=max(a[i].second,cur.second);
                c++;
                m=max(c,m);
            }
            else
            {
                c=1;
                cur=a[i];
            }
        }
        cout<<m<<"\n";
    }
    return 0;
}