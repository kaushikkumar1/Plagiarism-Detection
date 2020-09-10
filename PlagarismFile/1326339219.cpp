#include <cmath>
#include <cstdio>
#include <vector>
#include <iostream>
#include <algorithm>
using namespace std;
int main() {
    /* Enter your code here. Read input from STDIN. Print output to STDOUT */   
    int t,n,i,j;
    cin>>t;
    while(t--)
    {
        cin>>n;
        int arr[n],dep[n];
        for(i=0;i<n;i++)
            cin>>arr[i];
        for(i=0;i<n;i++)
            cin>>dep[i];
        sort(arr, arr + n); 
        sort(dep, dep + n); 
    int plat_needed = 1, result = 1; 
    i = 1; j = 0; 

    while (i < n && j < n) { 

        if (arr[i] <= dep[j]) { 
            plat_needed++; 
            i++; 
        } 
        else if (arr[i] > dep[j]) { 
            plat_needed--; 
            j++; 
        } 

        if (plat_needed > result) 
            result = plat_needed; 
    } 
        cout<<result<<'\n';
    }
    return 0;
}
