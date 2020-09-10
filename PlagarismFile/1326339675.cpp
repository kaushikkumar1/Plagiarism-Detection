#include <cmath>
#include <cstdio>
#include <vector>
#include <iostream>
#include <algorithm>
#include<bits/stdc++.h>
using namespace std;
#define FASTIO ios_base::sync_with_stdio(false);cin.tie(0);cout.tie(0);

int main() {
    FASTIO;
      
    int t=0;
    cin>>t;
    while(t--){
        long long n=0;
        cin>>n;
        long long a[n],b[n];
        for(long long i=0;i<n;i++){
            cin>>a[i];
        }
        for(long long i=0;i<n;i++){
            cin>>b[i];
        }
         long long plat_needed = 1, result = 1; 
    for (long long i = 0; i < n; i++) { 
        plat_needed = 1; 
  
        for (long long j = i + 1; j < n; j++) { 
            if ((a[i] >= a[j] && a[i] <= b[j]) ||  
           (a[j] >= a[i] && a[j] <= b[i])) 
                plat_needed++; 
        } 
        result = max(result, plat_needed); 
    } 
    cout<<result<<"\n";
        
    }
    return 0;
}