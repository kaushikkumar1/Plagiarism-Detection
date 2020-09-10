#include <cmath>
#include <cstdio>
#include <vector>
#include <iostream>
#include <algorithm>
using namespace std;


long long find(long long arr[], long long dep[], long long N) 
{ 
    long long plat_needed = 1, result = 1; 
    for (long long i = 0; i < N; i++) { 
        plat_needed = 1; 
  
        for (long long j = i + 1; j < N; j++) { 
            if ((arr[i] >= arr[j] && arr[i] <= dep[j]) ||  
           (arr[j] >= arr[i] && arr[j] <= dep[i])) 
                plat_needed++; 
        } 
        result = max(result, plat_needed); 
    } 
    return result; 
} 
int main() {
    /* Enter your code here. Read input from STDIN. Print output to STDOUT */   
    int T=0;
    cin>>T;
    while(T--){
        long long N=0;
        cin>>N;
        long long a[N],dep[N];
        for(long long i=0;i<N;i++){
            cin>>a[i];
        }
        for(long long i=0;i<N;i++){
            cin>>dep[i];
        }
        cout<<find(a,dep,N)<<"\n";
    }
    return 0;
}