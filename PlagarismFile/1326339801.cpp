#include <bits/stdc++.h>
using namespace std;
    int Platform(int arr[], int dep[], int n) 
{ 
    int plat_needed = 1, result = 1; 
    
    for (int i = 1; i < n; i++) { 
        plat_needed = 1; 
  
        for (int j = i + 1; j < n; j++) { 
            if ((arr[i] >= arr[j] && arr[i] <= dep[j]) ||   (arr[j] >= arr[i] && arr[j] <= dep[i])) 
                plat_needed++; 
        } 
        result = max(result, plat_needed); 
    } 
    return result;
}
  int main() 
{ 
    int t;
    cin>>t;
    while(t--)
    {
        int n;
        int arr[n];
        int dep[n];
        cin>>n;
        for(int i=0;i<n;i++)
        
            
            cin>>arr[i]>>dep[i];
        
         cout << Platform(arr, dep, n); 
    }
     //cout << Platform(arr, dep, n); 
    return 0; 
} 
    