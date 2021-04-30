FROM alpine:latest

RUN apk add --no-cache nodejs npm
ENV BOWTIE2_VERSION 2.2.8

RUN apk add --no-cache \
        perl 


WORKDIR /bzworkspace/Plagiarism-Detection

COPY . /bzworkspace/Plagiarism-Detection

RUN npm install

EXPOSE 3000

ENTRYPOINT ["node"]

CMD ["server.js"]
