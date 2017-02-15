#print out committees and subcommittees and the count of entries for manual inspection
from utils import load_data

#committees_current = load_data("committees-current.yaml")
memberships_current = load_data("committee-membership-current.yaml")

print("There are {} sub|committees total:".format(len(memberships_current)))

last = ""
for name, members in memberships_current.items():
  if name[:4] == last:
    print("{} : {}".format(" " + name.ljust(6), len(members)))
  else:
    print("{} : {}".format(name.ljust(7), len(members)))
  last=name[:4]