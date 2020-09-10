#include<bits/stdc++.h>
using namespace std;

int ct(int a[], int b[], int n) 
{
    int m = 1, s = 1;
    for (int i = 0; i < n; i++) { 
        m = 1; 
   for (int j = i + 1; j < n; j++) { 
    if ((a[i] >= a[j] && a[i] <= b[j]) ||  (a[j] >= a[i] && a[j] <= b[i])) 
                m++; 
   }
        s = max(s, m); 
    } 
  
    return s; 
} 
int main(){
   int z;
   cin>>z;
   while(z--){
     int n;
     cin>>n;
     int a[n], b[n];
     for(int i=0;i<n;i++){
     cin>>a[i];
     }
     for(int i=0;i<n;i++){
     cin>>b[i];
     }
     cout<<ct(a,b,n)<<"\n";
     
   }
}