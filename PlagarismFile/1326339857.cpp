#include <cmath>
#include <cstdio>
#include <vector>
#include <iostream>
#include <algorithm>
using namespace std;
struct thing 
{ 
    int v, w; 

};
bool cmp(struct thing a, struct thing b) 
{ 
    double r1 = (double)a.v / a.w; 
    double r2 = (double)b.v / b.w; 
    return r1 > r2; 
}
int main() {
    int t,n,given,i;
    cin>>t;
    while(t--)
    {
        cin>>n>>given;
        thing c[n];
      for(i=0;i<n;i++)
          cin>>c[i].v;
        for(i=0;i<n;i++)
            cin>>c[i].w;
        sort(c, c + n, cmp); 
       int cw = 0; 
      double answer = 0.00;
      for (int i = 0; i < n; i++) 
    { 
        if (cw + c[i].w <= given) 
        { 
           cw += c[i].w; 
            answer+=c[i].v; 
        } 
        else
        { 
            int r =given- cw; 
            answer += c[i].v * ((double) r / c[i].w); 
            break; 
        } 
    }
    printf("%.2f\n",answer);
    }
    return 0;
}
