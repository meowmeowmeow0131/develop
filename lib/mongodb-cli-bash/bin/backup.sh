#!/bin/bash

set -e

dump_path="/tmp/mongodump"
dump_file="${BACKUPFILE_PREFIX:-backup}-$(date "+%Y%m%d").tar.bz2"

echo "=== $0 started at $(date "+%Y/%m/%d %H:%M:%S") ==="

# dump database
echo "dump database ..."
mongodump -h ${MONGODB_HOST} -d ${MONGODB_DBNAME} -u ${MONGODB_USER} -p ${MONGODB_PASS} --authenticationDatabase ${MONGODB_AUTHDB} -o ${dump_path}

# archive dump file
echo "archive dump file ..."
time tar jcvf /tmp/${dump_file} -C ${dump_path}

# transfer archeve file to Amazon S3
echo "transfer dump file to S3 ..."
aws s3 cp ${dump_file} ${S3_BUCKET_URL}

# call healthchecks url for successful backup
echo "check eventual consistency ..."
curl -fsS --retry 3 ${HEALTHCHECKS_URL} > /dev/null
