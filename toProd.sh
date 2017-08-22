#!/bin/bash

webpack -p --config webpack.config.dev.js
scp src/bundle.js raspi:~/myllyFrontend/
ssh raspi "echo #Vadelma15 | sudo -S systemctl stop frontend; systemctl start frontend"
