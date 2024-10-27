function remove {
  (
    cd ./;\
    echo "Removing $1 to stage $2 in region $3..."
    sls remove --stage $2 --region $3 --verbose;\
  )
}

remove ./service/ $1 $2