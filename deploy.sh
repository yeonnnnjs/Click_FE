rm -rf build
npm run build
sudo docker build -t clickreact .
sudo docker run -d -p 80:3000 --network click-net clickreact