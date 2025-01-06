#include <iostream>

using namespace std;

int main()
{
int a = 0;
int b = 0;
int c = 0;
int z1;
int z2;
int z3;
int s1;
int s2;


cout << "Enter the first integer";
cin >> a;

cout << "Enter the second integer";
cin >> b;

cout << "Enter the third and final integer";
cin >> c;

z1 = a + b + c;
cout << z1 << endl;

z2= a - b + c;
cout << z2 << endl;

z3 = (a * b) + c;
cout << z3 << endl;

s1 = a^2;
cout << s1 << endl;
s2 = b^3;
cout << s2 << endl;
    return 0;
}
