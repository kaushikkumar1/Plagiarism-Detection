#include<bits/stdc++.h
using namespace std;
#define M 1001
int knap(int dp[][M], int val[], int wt[], int w, int n)
{
    if(n == 0 || w == 0)
        return 0;
    if(dp[n][w] != -1)
        return dp[n][w];
    if(wt[n-1] > w)
        return dp[n][w] =  knap(dp, val, wt, w, n-1);
    else
        return dp[n][w] =  max(val[n-1] + knap(dp, val, wt, w - wt[n-1], n-1), knap(dp,val, wt, w, n-1));
}
int main() {
    int t; cin >> t;
    while(t--)
    {
        int n,w;
        cin >> n >> w;
        int val[n], wt[n];
        for(int i = 0; i < n; i++)
            cin >> val[i];
        for(int i = 0; i < n; i++)
            cin >> wt[i];
        int dp[1001][1001];
        memset(dp, -1, sizeof(dp));
        cout << knap(dp, val, wt, w, n) << endl;
    }
    return 0;
}