import serial
from firebase import firebase
from time import sleep
from datetime import datetime
import serial.tools.list_ports


ports = serial.tools.list_ports.comports()
for port, desc, hwid in sorted(ports):
        print("{}: {} [{}]".format(port, desc, hwid))



ser = serial.Serial("COM2", 9600)
test1 = str(ser.readline())
print(test1)
i=0        
res =1
time=datetime.now().strftime("%d-%m-%Y %H:%M:%S")
print(time)

while res:
     firebase1 = firebase.FirebaseApplication('https://earthquake-detection-default-rtdb.firebaseio.com/', None)
     
     for i in range(0,4):
            Axisx = Axisy = Axisz = str(ser.readline())
            Axisx = Axisx[5:][:-26]
            Axisy = Axisy[14:][:-16]
            Axisz = Axisz[23:][:-7]
            data1 =  { 'date': datetime.now().strftime("%Y-%m-%d"),
               'reading':Axisx,
               'time': datetime.now().strftime("%H:%M")               
          }
            data2 =  { 'date': datetime.now().strftime("%Y-%m-%d"),
               'reading':Axisy,
               'time': datetime.now().strftime("%H:%M")               
          }
            data3 =  { 'date': datetime.now().strftime("%Y-%m-%d"),
               'reading':Axisz,
               'time': datetime.now().strftime("%H:%M")               
          }

            result1 = firebase1.patch('/X-Axis/'+ str(i), data1)
            result2 = firebase1.patch('/Y-Axis/'+ str(i), data2)
            result3 = firebase1.patch('/Z-Axis/'+ str(i), data3)
            print(result1,result2,result3)
            res = 0
     

     

