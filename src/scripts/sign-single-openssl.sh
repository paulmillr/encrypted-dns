#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -lt 5 ]; then
  echo "usage: scripts/sign-single-openssl.sh --ca <cert.pem> --priv_key <key.pem> [--chain <chain.pem>] <path.mobileconfig>" >&2
  exit 1
fi

ca=""
priv_key=""
chain=""
input=""

while [ "$#" -gt 0 ]; do
  case "$1" in
    --ca)
      ca="$2"
      shift 2
      ;;
    --priv_key)
      priv_key="$2"
      shift 2
      ;;
    --chain)
      chain="$2"
      shift 2
      ;;
    *)
      input="$1"
      shift
      ;;
  esac
done

if [ -z "$ca" ] || [ -z "$priv_key" ] || [ -z "$input" ]; then
  echo "usage: scripts/sign-single-openssl.sh --ca <cert.pem> --priv_key <key.pem> [--chain <chain.pem>] <path.mobileconfig>" >&2
  exit 1
fi

for f in "$ca" "$priv_key" "$input"; do
  if [ ! -f "$f" ]; then
    echo "missing file: $f" >&2
    exit 1
  fi
done
if [ -n "$chain" ] && [ ! -f "$chain" ]; then
  echo "missing file: $chain" >&2
  exit 1
fi

if [[ "$input" == *.mobileconfig ]]; then
  out="${input%.mobileconfig}.signed.mobileconfig"
else
  out="$input.signed.mobileconfig"
fi

cmd=(openssl cms -sign -binary -nodetach -nosmimecap -in "$input" -signer "$ca" -inkey "$priv_key" -outform DER -out "$out")
if [ -n "$chain" ]; then
  cmd+=( -certfile "$chain" )
fi
"${cmd[@]}"
echo "$out"
