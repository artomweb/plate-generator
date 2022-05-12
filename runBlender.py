import subprocess
import os
filesArr = []

for r, dirs, files in os.walk("plates/"):
    filesArr = files

# print(filesArr)


for p in filesArr[:5]:
    command = '"C:\\Program Files\\Blender Foundation\\Blender 2.83\\blender.exe" "C:\\Users\\Archie\Desktop\\code\\numberPlateMemory\\blender\\carNumPlateTrack3.blend" --background --python car3.py -- "C:\\Users\\Archie\Desktop\\code\\numberPlateMemory\\plates\\' + p + '"'
    print(command)
    proc = subprocess.run(command, stdout=subprocess.PIPE, shell=True)

    print(p, "complete")

    os.remove("plates/" + p)
