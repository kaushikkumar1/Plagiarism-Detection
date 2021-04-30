docker system prune -f
docker build -t plagiarism-detection .
docker rm plagiarism-detection -f
docker run -p 3000:3000 -d -t plagiarism-detection
docker ps -a

docker logs plagiarism-detection -f