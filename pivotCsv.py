import sys
from io import StringIO
from hestia_earth.utils.table import pivot_csv

if sys.argv[2] == 'TRUE':
   print(pivot_csv(sys.argv[1]))

data = StringIO(sys.argv[1])
print(pivot_csv(data))

