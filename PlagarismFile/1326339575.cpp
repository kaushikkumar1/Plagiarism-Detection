#include <cmath>
#include <cstdio>
#include <vector>
#include <iostream>
#include <algorithm>
using namespace std;

long long int findPlatform(long long int arr[],long long int dep[], long long int n) 
{ 
    long long int plat_needed = 1, result = 1; 
   long long  int i = 0, j = 0; 
    for (int i = 0; i < n; i++) { 
        plat_needed = 1; 
  
        for (int j = i + 1; j < n; j++) { 
            if ((arr[i] >= arr[j] && arr[i] <= dep[j]) ||  
           (arr[j] >= arr[i] && arr[j] <= dep[i])) 
                plat_needed++; 
        } 
        result = max(result, plat_needed); 
    }
    return result;
}

int main() {
    int t;
    cin>>t;
    while(t--)
    {
        long long int n;
        cin>>n;
        long long int a[n],d[n];
        for(long long int i=0;i<n;i++)
        {
            cin>>a[i];
        }
         for(long long int i=0;i<n;i++)
        {
             cin>>d[i];
         }
        cout << findPlatform(a, d, n)<<"\n"; 
    }
    return 0;
}
