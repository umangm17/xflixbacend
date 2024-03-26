mongo xflix --eval "db.dropDatabase()"
mongoimport -d xflix -c videos --file data/xflix.videos.json