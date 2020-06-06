#!/usr/bin/env python
 
import subprocess
import sys
 
command = ["ls", "-l"]
 
res = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
 
sys.stdout.buffer.write(res.stdout)
