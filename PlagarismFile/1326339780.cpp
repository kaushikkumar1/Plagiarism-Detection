#include<bits/stdc++.h>
using namespace std;
#define FASTIO ios::sync_with_stdio(false); cin.tie(NULL);cout.tie(NULL);

struct knap{
    int val,weight,vByw;
    knap(int v,int w,int vw){
        val=v; weight=w; vByw=vw;
    }
};

bool cmp(knap x,knap y){
    return x.vByw >y.vByw;
}

int main(){
    FASTIO;
    int t; cin>>t;
    while(t--){
        int n,w; cin>>n>>w;
        vector<knap>a;
        vector<int>p; vector<int>p1;
        int i;
        for(i=0;i<n;i++){
            int x; cin>>x;
            p.push_back(x);
        }
        for(i=0;i<n;i++){
            int x; cin>>x;
            p1.push_back(x);
        }
        for(i=0;i<n;i++)
            a.push_back(knap(p[i],p1[i],p[i]/p1[i]));
        sort(a.begin(),a.end(),cmp);
        int m=0,tmp=0;
        double f=0.0;
        for(i=0;i<n;i++){
            if(m+a[i].weight<=w){
                m+=a[i].weight;
                f+=a[i].val;
            }
            else{
                tmp=w-m;
                f+= (a[i].val)*((double)tmp/a[i].weight);
                break;
            }
        }
        cout<<fixed<<setprecision(2)<<f<<"\n";
    }
}