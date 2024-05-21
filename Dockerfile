#基于nginx为基础镜像
FROM nginx:latest

#设定容器运行时的工作目录
WORKDIR /usr/share/nginx/html

#删除默认目录下index.html文件
RUN rm  -rf /usr/share/nginx/html/*

#更新源、安装unzip解压缩命令
RUN apt-get update && apt-get install -y unzip

#拷贝文件进入工作目录
COPY build.zip /usr/share/nginx/html

#解压文件
RUN unzip build.zip  && mv build/* /usr/share/nginx/html

#容器运行时对外暴露端口
EXPOSE 80