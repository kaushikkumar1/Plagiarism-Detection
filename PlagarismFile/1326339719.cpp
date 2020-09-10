#include<bits/stdc++.h> 
using namespace std; 
int findPlatform(int arr[], int dep[], int n) 
{ 
    sort(arr, arr + n); 
    sort(dep, dep + n); 
    int plat_needed = 1, result = 1; 
    int i = 1, j = 0; 
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
  
    return result; 
}
int main() 
{ 
  int t;
  cin>>t;
  while(t--)
  {
  int n;
  cin>>n;
    //vector< pair <int,int> > vect; 
    int s[n];
    int f[n];
    for (int i=0; i<n; i++){
    int p,e;
    cin>>p>>e;
    e=p+e;
    s[i]=p;
    f[i]=e;
        //vect.push_back( make_pair(s,e) ); 
    }
  int k=findPlatform(s,f,n);
  cout<<k-2<<"\n";
  }
    return 0; 
}