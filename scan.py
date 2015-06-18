from socket import *

def tester(stuff, oda):
	if "socket" == str(stuff)[1:7:]:
		print "Port " + str(oda) + " Open"
		print
	else:
		print "Port " + str(oda) + " Closed"

def main(maximum, minimum=1):
	while 1==1:
		port = raw_input("Port: ")
		port = int(port)
		hozt = getaddrinfo("127.0.0.1", str(port))
		print hozt[0][4]
		tester(create_connection(hozt[0][4], 60), port)

main(80, 70)