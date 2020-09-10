#include <cmath>
#include <cstdio>
#include <vector>
#include <iostream>
#include <algorithm>
#include<bits/stdc++.h>
using namespace std;

long long search1(long long arr[], long long dep[], long long n) 
{ 
    long long plat = 1, result = 1; 
    for (long long i = 0; i < n; i++) { 
        plat = 1; 
  
        for (long long j = i + 1; j < n; j++) { 
            if ((arr[i] >= arr[j] && arr[i] <= dep[j]) ||  
           (arr[j] >= arr[i] && arr[j] <= dep[i])) 
                plat++; 
        } 
        result = max(result, plat); 
    } 
    return result; 
} 
int main() {
       
    int t=0;
    cin>>t;
    while(t--){
        long long n=0;
        cin>>n;
        long long a[n],dep[n];
        for(long long i=0;i<n;i++){
            cin>>a[i];
        }
        for(long long i=0;i<n;i++){
            cin>>dep[i];
        }
        cout<<search1(a,dep,n)<<"\n";
    }
    return 0;
}