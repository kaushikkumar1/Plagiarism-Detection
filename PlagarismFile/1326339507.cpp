#include <bits/stdc++.h>
using namespace std;
int findPlatform(int arr[], int dep[],int n) 
{ 
    sort(arr, arr + n); 
    sort(dep, dep + n);
    int plat = 1, result = 1; 
    int i = 1, j = 0;
    while (i < n && j < n) { 
      
        if (arr[i] <= dep[j]) { 
            plat++; 
            i++; 
        } 
  
      
        else if (arr[i] > dep[j]) { 
            plat--; 
            j++; 
        } 
  
         if (plat > result) 
            result = plat; 
    } 
  
    return result; 
} 
  

int main() 
{ 
       int t;
       cin>>t;
       while(t--){
       int n;cin>>n; 
        int arr[n],dep[n];
        for(int i=0;i<n;i++)
            cin>>arr[i];
       for(int i=0;i<n;i++)
           cin>>dep[i];
    cout<<findPlatform(arr, dep,n)<<"\n"; 
}
    return 0; 
} 