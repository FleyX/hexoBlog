FROM ubuntu:18.04
RUN cd /opt && \
    apt update && \
    apt install -y wget && \
    apt install -y xz-utils && \
    apt install -y git && \
    wget https://npm.taobao.org/mirrors/node/v10.15.1/node-v10.15.1-linux-x64.tar.xz && \
    xz -d node-v10.15.1-linux-x64.tar.xz && \
    tar -xvf node-v10.15.1-linux-x64.tar && \
    rm node-v10.15.1-linux-x64.tar && \
    mv node-v10.15.1-linux-x64 node10 && \
    export PATH=$PATH:/opt/node10/bin && \
    npm --registry https://registry.npm.taobao.org install -g cnpm typescript hexo
ENV PATH=$PATH:/opt/node10/bin NODE_ENV=production
