#include <cmath>
#include <cstdio>
#include <vector>
#include <iostream>
#include <algorithm>
#include<bits/stdc++.h>
using namespace std;


int main() {
    long long int t;
    cin>>t;
    while(t--)
        {
        long long int n,i,j,k,l;
        cin>>n;
        long long int a[n],b[n];
        for(i=0;i<n;i++){
            cin>>a[i];
            }
        
        for(i=0;i<n;i++)
            cin>>b[i];
        
        sort(a,a+n);
        sort(b,b+n);
        
        
     int    p=1,r=1;
        i=1;
        j=0;
        
        
        while(i<n && j<n){
            if(a[i]<=b[j])
                {p++;
                 i++;
                 }
            else if(a[i]>b[j]){
                p--;
                j++;
                }
            if(p>r)
                r=p;
            }
        
        cout<<r<<"\n";
        }
        
        
    /* Enter your code here. Read input from STDIN. Print output to STDOUT */   
    return 0;
}
