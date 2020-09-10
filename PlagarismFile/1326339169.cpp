// Program to find minimum number of platforms 
// required on a railway station 
#include <algorithm> 
#include <iostream> 

using namespace std; 

// Returns minimum number of platforms reqquired 
int findPlatform(int arr[], int dep[], int n) 
{ 
    int plat_needed = 1, result = 1; 
    int i = 1, j = 0;  
    for (int i = 0; i < n; i++) { 
        // minimum platform 
        plat_needed = 1; 

        for (int j = i + 1; j < n; j++) { 
            // check for overlap 
            if ((arr[i] >= arr[j] && arr[i] <= dep[j]) || 
        (arr[j] >= arr[i] && arr[j] <= dep[i])) 
                plat_needed++; 
        } 

        // update result 
        result = max(result, plat_needed); 
    } 

    return result; 
} 

// Driver program to test methods of graph class 
int main() 
{ 
    int t;cin>>t;
    while(t--)
    {
        int n;
        cin>>n;
        int arr[n],dep[n];
        for(int i=0;i<n;i++)
        {
            cin>>arr[i];
        }
        for(int i=0;i<n;i++)
        {
            cin>>dep[i];
        }
        cout<< findPlatform(arr, dep, n)<<"\n";
        
    }
    cout<<"\n";
         
    return 0; 
} 
