#include<bits/stdc++.h>
using namespace std;
int *return_array(int n){
    int *ar = new int[n];
    for(int i=0;i<n;i++){
        cin>>ar[i];
    }
    return ar;
}
int main(){
   int n;
   cin>>n;
   int *a = return_array(n); 
   for(int i=0;i<n;i++){
     cout<<a[i]<<" ";
   }
   delete[] a;
    return 0;
}

