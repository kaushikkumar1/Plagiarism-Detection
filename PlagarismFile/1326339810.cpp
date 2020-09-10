#include <cmath>
#include <cstdio>
#include <vector>
#include <iostream>
#include <algorithm>
#include<bits/stdc++.h>

#include<bits/stdc++.h>
using namespace std;

int cntpf(int a[], int b[], int n) 
{
    int s = 1, t= 1; 
    int i , j; 
    for (int i = 0; i < n; i++) { 
        s= 1; 
  
        for (int j = i + 1; j < n; j++) { 
            if ((a[i] >= a[j] && a[i] <= b[j]) ||  
           (a[j] >= a[i] && a[j] <= b[i])) 
                s++; 
        }
        t = max(t, s); 
    } 
  
    return t; 
} 
int main(){
   int t;
   cin>>t;
   while(t--){
     int n;
     cin>>n;
     int a[n], b[n];
     for(int i=0;i<n;i++){
     cin>>a[i];
     }
     for(int i=0;i<n;i++){
     cin>>b[i];
     }
     cout<<cntpf(a,b,n)<<"\n";
     
   }
}
