#include <cmath>
#include <cstdio>
#include <vector>
#include <iostream>
#include <algorithm>
#include<bits/stdc++.h>
using namespace std;

long long found(long long a[], long long d[], long long n) 
{ 
    long long p= 1, result = 1; 
    for (long long i = 0; i < n; i++) { 
        p= 1; 
  
        for (long long j = i + 1; j < n; j++) { 
            if ((a[i] >= a[j] && a[i] <= d[j]) ||  
           (a[j] >= a[i] && a[j] <= d[i])) 
                p++; 
        } 
        result = max(result, p); 
    } 
    return result; 
} 
int main() {
    /* Enter your code here. Read input from STDIN. Print output to STDOUT */   
    int t=0;
    cin>>t;
    while(t--){
        long long n=0;
        cin>>n;
        long long a[n],d[n];
        for(long long i=0;i<n;i++){
            cin>>a[i];
        }
        for(long long i=0;i<n;i++){
            cin>>d[i];
        }
        cout<<found(a,d,n)<<"\n";
    }
    return 0;
}