#include <bits/stdc++.h>
using namespace std;
int main()
{
    int n;
    cin >> n;
    int ar[n];
    for (int i = 0; i <= n - 1; i++)
    {
        cin >> ar[i];
    }

    for (int i = 0; i <= n-1; i++)
    {
        for (int j = i + 1; j <= n - 1; j++)
        {
            if (ar[i] > ar[j])
            {
                swap(ar[i], ar[j]);
            }
        }
        cout<<ar[i]<<" ";
    }

    return 0;
}
