for _ in range(int(input())):
    t=int(input())
    arr=list(map(int,input().split()))
    dep=list(map(int,input().split()))
    count = 1
    arr.sort()
    dep.sort()
    i=1
    j=0
    while i<t and j<t:
        if arr[i]<=dep[j]:
            count+=1
        elif arr[i] > dep[j]:
            j+=1
        i+=1

    print(count)