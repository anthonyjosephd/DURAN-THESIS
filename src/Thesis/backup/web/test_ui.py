import tkinter as tk
from time import sleep
import keyboard

class Application(tk.Frame):
    def __init__(self, master=None):
        super().__init__(master)
        self.master = master
        self.pack()
        self.create_widgets()

    def create_widgets(self):
        #self.hi_there = tk.Button(self)
        #self.hi_there["text"] = "Hello World\n(click me)"
        #self.hi_there["command"] = self.say_hi
        self.main = tk.Label(text =  "Tracer").place(x = 40, y = 120)
        #self.main.pack(side="top")
        
        scan()
        #self.quit = tk.Button(self, text="QUIT", fg="red",
        #                      command=self.master.destroy)
        #self.quit.pack(side="bottom")
        

    def say_hi(self):
        user_name = tk.Label(text =  scan()).place(x = 40, y = 60)
        

def scan():
    id = "0"
    try:
        while True:
            print("scanning..")
            if keyboard.read_key() == "q":  
                id = "aaa"
                break
    except KeyboardInterrupt:
        pass

    return id
 
root = tk.Tk()
app = Application(master=root)
app.mainloop()


