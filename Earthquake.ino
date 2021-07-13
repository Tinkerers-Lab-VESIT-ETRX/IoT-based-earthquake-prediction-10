const int x = A0;
const int y = A1;
const int z = A2;

const int Sample = 10; 

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  int X = ReadAvg(x);
  int Y = ReadAvg(y);
  int Z = ReadAvg(z);

  long Xscale = map(X,0,1023,-3000,3000);
  long Yscale = map(Y,0,1023,-3000,3000);
  long Zscale = map(Z,0,1023,-3000,3000);

  float Xg = Xscale / 1000.0;
  float Yg = Yscale / 1000.0;
  float Zg = Zscale / 1000.0;

  Serial.print("X: ");
  Serial.print(Xg);
  Serial.print("G ");
  Serial.print("Y: ");
  Serial.print(Yg);
  Serial.print("G ");
  Serial.print("Z: ");
  Serial.print(Zg);
  Serial.println("G ");

  delay(500);
  
}

int ReadAvg(int a) {
  // Function to take avg to reduce noise
  long temp = 0;
  for (int i=0; i < Sample; i++)
  {
    temp += analogRead(a);
  }
  return temp/Sample;
}
