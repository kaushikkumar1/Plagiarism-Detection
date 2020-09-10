##include<bits/stdc++.h>
using namespace std;

int countplatform(int a[], int b[], int n) 
{
    int p = 1, r = 1; 
    int i = 1, j = 0; 
    for (int i = 0; i < n; i++) { 
        p = 1; 
  
        for (int j = i + 1; j < n; j++) { 
            if ((a[i] >= a[j] && a[i] <= b[j]) ||  
           (a[j] >= a[i] && a[j] <= b[i])) 
                p++; 
        }
        r = max(r, p); 
    } 
  
    return r; 
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
     cout<<countplatform(a,b,n)<<"\n";
     
   }
}