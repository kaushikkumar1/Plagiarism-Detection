#include <bits/stdc++.h>
using namespace std; 

int Pl(int a1[], int a2[], int n) 
{ 
    sort(a1, a1 + n); 
    sort(a2, a2 + n); 

    int c = 1, r = 1; 
    int i = 1, j = 0; 

    while (i < n && j < n) { 
        if (a1[i] <= a2[j]) { 
            c++; 
            i++; 
        } 

        else if (a1[i] > a2[j]) { 
            c--; 
            j++; 
        } 

        if (c> r) 
            r = c; 
    } 

    return r; 
} 

int main() 
{ 
    int t;
    cin>>t;
    while(t--)
    {
        int n;
        cin>>n;
        int a1[n],a2[n];
        for(int i=0;i<n;i++)
        {
            cin>>a1[i];
        }
        for(int i=0;i<n;i++)
        {
            cin>>a2[i];
        }
    cout << Pl(a1, a2,n)<<"\n"; 
    }
    return 0; 
} 
