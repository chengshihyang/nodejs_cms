#!/bin/sh

[ -f "/tmp/reboot" ] && {
	printf '{"status":1}'
	exit 0
}
printf '{"status":1}'
