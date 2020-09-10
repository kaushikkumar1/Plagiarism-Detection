#include <bits/stdc++.h> 
using namespace std; 
  

int main() 
{ int n;
 cin>>n;
 while(n--)
     {
    int t;
     cin>>t;
        int a[n],d[n];
     for (int i=0;i<n;i++)
         cin>>a[i];
     for (int i=0;i<n;i++)
         cin>>d[i];
     sort(a,a+n);
     sort(d,d+n);
     int p=1,r=1,i=1,j=0;
     while(i<n&&j<n)
         {
         if(a[i]<=d[j]){
             p++;
         i++;}
         else if(a[i]>d[j]){
             p--;
         j++;}
         if(p>r){
             r=p;}
         }
     cout<<r<<"\n";
             
         
    return 0; 
} 

}
    /* Enter your code here. Read input from STDIN. Print output to STDOUT */   
    

