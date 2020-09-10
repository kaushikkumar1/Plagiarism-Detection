#include<bits/stdc++.h>
using namespace std;
int findPlatform(vector<int> arr,vector<int> dep,int n)
{
    sort(arr.begin(),arr.end());
    sort(dep.begin(),dep.end());
    int plat_needed=1,r=1;
    int i=1,j=0;
    while(i<n&&j<n)
    {
        if(arr[i]<=dep[j])
        {
            plat_needed++;
            i++;
        }
        else if (arr[i] > dep[j])
        {
            plat_needed--;
            j++;
        }
        if (plat_needed >r)
            r= plat_needed;
    }
    return r;
}
int main()
{
    int z;
    cin>>z;
    while (z--)
    {
        int n;
        cin>>n;
        vector<int> arr(n);
        vector<int> dep(n);
        for(int i=0;i<n;i++)
        {
            cin>>arr[i];
        }
        for (int j=0;j<n;j++)
        {
            cin>>dep[j];
        }
        cout << findPlatform(arr,dep,n)<<"\n";
    }
}