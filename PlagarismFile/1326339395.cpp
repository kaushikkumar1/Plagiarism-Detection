#include <algorithm>
#include <iostream>
#include <bits/std_abs.h>
#include <vector>
using namespace std;
int findPlatform(vector<int> arr,vector<int> dep, int n)
{
    sort(arr.begin(),arr.end());
    sort(dep.begin(), dep.end());
    int plat_needed = 1, result = 1;
    int i = 1, j = 0;
    while (i < n && j < n)
    {
        if (arr[i] <= dep[j])
        {
            plat_needed++;
            i++;
        }
        else if (arr[i] > dep[j])
        {
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
    cin >> t;
    while (t--)
    {
        int n;
        cin >> n;
        vector<int> arr(n);
        vector<int> dep(n);
        for (int i = 0; i < n; i++)
        {
            cin >> arr[i];
        }
        for (int j = 0; j < n; j++)
        {
            cin >> dep[j];
        }
        cout << findPlatform(arr, dep, n)<<"\n";
    }
    return 0;
}
