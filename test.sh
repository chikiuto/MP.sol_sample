#!/bin/bash
ROOT=$(cd $(dirname $0); pwd)
ROOT=$(dirname $ROOT)

# node template.js createToken "https://test=0ed3ad0caefda33f042e4e2e0b86645b368d1c45b12373b43ee4e70c1ac5bd80" "0.003"

node template.js getAllNFTs

# node template.js getListedTokenForId 1

# end of script
