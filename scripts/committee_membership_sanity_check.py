#print out committees and subcommittees and the count of entries for manual inspection
import rtyaml

def run():
  #for some reason reading pickle cached files isn't in order...
  memberships_current = rtyaml.load(open("..//committee-membership-current.yaml"))
  maincount = 0
  subcount = 0
  last = ""
  for name, members in memberships_current.items():
    leaderships = []
    for member in members:
      if 'title' in member:
        leaderships.append(member["title"])
    if name[:4] == last:
      subcount+=1
      print("{} : {} | {}".format(" " + name.ljust(6), str(len(members)).ljust(2), ", ".join(sorted(leaderships))))
    else:
      maincount+=1
      print("{} : {} | {}".format(name.ljust(7), str(len(members)).ljust(2), ", ".join(sorted(leaderships))))
    last=name[:4]

  print("There are {} total entries, {} committees and {} subcommittees.".format(len(memberships_current), maincount, subcount))

if __name__ == '__main__':
  run()