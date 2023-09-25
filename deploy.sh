rm -rf build
npm run build
sudo docker stop frontend
sudo docker rm frontend
sudo docker build -t clickreact .
sudo docker run -d -p 80:3000 -e TZ=Asia/Seoul --name frontend --network click-net clickreact