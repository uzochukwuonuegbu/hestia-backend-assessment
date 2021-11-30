import sys
from io import StringIO
from hestia_earth.utils.table import pivot_csv

data = StringIO(sys.argv[1])
print(pivot_csv(data))

