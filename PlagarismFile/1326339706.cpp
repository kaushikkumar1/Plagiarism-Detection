#include<bits/stdc++.h>
using namespace std;

int minPlatform(int arrival[], int departure[], int n) {
   sort(arrival, arrival+n);     
   sort(departure, departure+n);

   int platform = 1, minPlatform = 1;
   int i = 1, j = 0;

   while (i < n && j < n) {
      if (arrival[i] < departure[j]) {
         platform++;     
         i++;
         if (platform > minPlatform)    
            minPlatform = platform;
           } 
       else {
         platform--;      
         j++;
      }
   }
   return minPlatform;
}

int main() {
   int t;cin>>t;
    while(t--)
    {
        int n,count=0;cin>>n;
        int arr[n];
        int dep[n];
        for(int i=0;i<n;i++)
            cin>>arr[i];
         for(int i=0;i<n;i++)
            cin>>dep[i];
    count=minPlatform(arr, dep, n);
       cout<<count<<"\n";
    }
}