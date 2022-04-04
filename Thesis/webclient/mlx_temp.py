from smbus2 import SMBus
from mlx90614 import MLX90614
import json

def read_temp():
    bus = SMBus(1)
    sensor = MLX90614(bus, address=0x5A)

    # results
    results = {
        "ambient_temp": sensor.get_ambient(),
        "object_temp": sensor.get_object_1()
    }

    # close bus
    bus.close()
    return json.dumps(results)