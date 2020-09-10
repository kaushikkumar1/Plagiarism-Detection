#include <iostream>
using namespace std;


int minPlatform(int ar[], int dr[], int n) 
{  
    int p[2361]={}; 
    int cnt=1; 
    for (int i=0;i<n;i++)
    { 
        ++p[ar[i]];
        --p[dr[i]+1]; 
    } 
    for(int i=1;i<2361;i++) 
    {
        p[i]=p[i]+p[i-1];  
        cnt=max(cnt, p[i]); 
    } 
    return cnt; 
} 

int main() {
    // your code goes here
    int t;cin>>t;
    while(t--)
    {
        int n;
        cin>>n;
        int ar[n];
        int dr[n];
        for(int i=0;i<n;i++)
        {
            cin>>ar[i];
        }
        for(int i=0;i<n;i++)
        {
            cin>>dr[i];
        }
        cout<<minPlatform(ar, dr, n)<<"\n";
    }
    return 0;
}