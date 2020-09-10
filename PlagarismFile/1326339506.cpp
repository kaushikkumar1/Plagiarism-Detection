#include<bits/stdc++.h>
using namespace std;

int count(int x[], int y[], int a) 
{
    int u = 1, v = 1; 
    int i = 1, j = 0; 
    for (int i = 0; i < a; i++) { 
        u = 1; 
  
        for (int j = i + 1; j < a; j++) { 
            if ((x[i] >= x[j] && x[i] <= y[j]) ||  
           (x[j] >= x[i] && x[j] <= y[i])) 
                u++; 
        }
        v = max(v, u); 
    } 
  
    return v; 
} 
int main(){
   int t;
   cin>>t;
   while(t--){
     int a;
     cin>>a;
     int x[a], y[a];
     for(int i=0;i<a;i++){
     cin>>x[i];
     }
     for(int i=0;i<a;i++){
     cin>>y[i];
     }
     cout<<count(x,y,a)<<"\n";
     
   }
}