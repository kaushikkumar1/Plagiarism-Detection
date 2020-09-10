#include <iostream>
#include <bits/stdc++.h>
using namespace std;
int main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
    int t;
    cin>>t;
    while(t--)
    {
    long long n;
    cin>>n;
    vector<int> v(n),v1(n);
    for(int i=0;i<n;i++)
    {
        cin>>v[i];
    }
    for (int i = 0; i < n; i++)
    {
        cin >> v1[i];
    }
    sort(v.begin(), v.end());
    sort(v1.begin(), v1.end());
    int i=1,j=0,p=1,r=1;
    while (i < n && j < n)
    {
        if (v[i] <= v1[j])
        {
            p++;
            i++;
        }
        else if (v[i] > v1[j])
        {
            p--;
            j++;
        }
        if (p > r)
            r = p;
    }

    cout<<r<<"\n";
    }
}