#print out committees and subcommittees and the count of entries for manual inspection
import rtyaml

def run():
  #for some reason reading pickle cached files isn't in order...
  memberships_current = rtyaml.load(open("..//committee-membership-current.yaml"))
  maincount = 0
  subcount = 0
  last = ""
  for name, members in memberships_current.items():
    if name[:4] == last:
      subcount+=1
      print("{} : {}".format(" " + name.ljust(6), len(members)))
    else:
      maincount+=1
      print("{} : {}".format(name.ljust(7), len(members)))
    last=name[:4]

  print("There are {} total entries, {} committees and {} subcommittees.".format(len(memberships_current), maincount, subcount))

if __name__ == '__main__':
  run()