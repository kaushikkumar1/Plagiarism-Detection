#include <cmath>
#include <cstdio>
#include <vector>
#include <iostream>
#include <algorithm>
using namespace std;


int main() {
    int t;
    cin>>t;
    while(t--){
        int n;
        cin>>n;
        int a[n],d[n];
        for(int i=0;i<n;i++)
            cin>>a[i];
        for(int i=0;i<n;i++)
            cin>>d[i];
        sort(a,a+n);
        sort(d,d+n);
        int pf=1,res=1;
        int i=1,j=0;
        while(i<n && j<n){
            if(a[i]<=d[j]){
                pf++;
                i++;}
            else if(a[i]>d[j]){
                pf--;
            j++;}
            if(pf>res)
                res=pf;}
        cout<<res<<"\n";
            }
            
    /* Enter your code here. Read input from STDIN. Print output to STDOUT */   
    return 0;
}
