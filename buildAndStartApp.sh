echo Building dental-booking-app image;
docker build -t "dental-booking app" .;

echo Starting container;
docker run -d -p 5000:5000 --name 'dba' dental-booking-app;