#include <bits/stdc++.h>
#include <cstdio>
#include <vector>
#include <iostream>
#include <algorithm>
using namespace std;


int main() {
    /* Enter your code here. Read input from STDIN. Print output to STDOUT */
    int t;
    cin>>t;
    while(t--)
    {
        int n,b;
        cin>>n>>b;
        int p[n],q[n];
        for(int i=0;i<n;i++)
            cin>>p[i];
        for(int i=0;i<n;i++)
            cin>>q[i];
        float count=0;
        int i=0;
        while(b>0 &&i<n)
        {
            count+=p[i];
            b=b-q[i];
            i++;
            //cout<<b<<" ";
        }
        //cout<<count<<" ";
        if(b<0)
        {
            i=i-1;
            b+=q[i];
            count-=p[i];
            //cout<<b<<" "<<q[i]<<" "<<p[i]<<" ";
            count+=((b*p[i])/q[i]);
        }
        printf("%.2f\n",count);
    }
    return 0;
}
