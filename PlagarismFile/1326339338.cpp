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
        int m;
        cin>>m;
        vector<pair<int,int>> a(m);
        for(int i=0;i<m;i++)cin>>a[i].first;
        for(int i=0;i<m;i++)cin>>a[i].second;
        sort(a.begin(),a.end(),cmp);
        pair<int,int> curr=a[0];
        int c=1,m1=1;
        for(int i=1;i<a.size();i++)
        {
            if(a[i].first<curr.second)
            {
                curr.second=max(a[i].second,curr.second);
                c++;
                m1=max(c,m1);
            }
            else
            {
                c=1;
                curr=a[i];
            }
        }
        cout<<m1<<"\n";
    }
    return 0;
}
