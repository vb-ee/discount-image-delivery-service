#!/bin/sh
ssh-keygen -A
/usr/sbin/sshd -e "$@"
sh -c '/bin/wait-for-it.sh rabbitmq:5672 --timeout=30 -- npm run dev'