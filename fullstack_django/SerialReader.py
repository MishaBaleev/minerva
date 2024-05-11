import serial 
import json

class SerialReaderClass():
    def __init__(self, int):
        self.int = int 
        self.session = None
        self.counter = 0
        self.freq_arr = [0 for i in range(82)]

    def createCon(self):
        self.session = serial.Serial(self.int, baudrate=230400)

    def parseData(self, data):
        channels_shift = {
            "Channel_1": 0,
            "Channel_2": 5,
            "Channel_3": 10,
            "Channel_4": 15,
            "Channel_5": 20,
            "Channel_6": 25,
            "Channel_7": 30,
            "Channel_8": 35,
            "Channel_9": 40,
            "Channel_10": 45,
            "Channel_11": 50,
            "Channel_12": 55,
            "Channel_13": 60,
        }
        for key in data.keys():
            for index, value in enumerate(data[key]):
                target_index = index + channels_shift[key]
                self.freq_arr[target_index] = int(value)

    def getData(self):
        try:
            raw_data = json.loads(self.session.readline().decode().replace("'", '"'))
            self.parseData(raw_data)
            result = self.freq_arr
            self.freq_arr = [0 for i in range(82)]
            return result
        except:
            print("error")