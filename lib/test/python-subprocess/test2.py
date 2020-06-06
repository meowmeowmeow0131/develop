#!/usr/bin/env python

import subprocess
import sys

try:
    res = subprocess.run("ls -l | awk '{print $9}'",
        shell=True, check=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    sys.stdout.buffer.write(res.stdout)

except subprocess.CalledProcessError:
    print('外部プログラムの実行に失敗しました。')
