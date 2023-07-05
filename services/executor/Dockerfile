FROM python:3.11
WORKDIR /app
EXPOSE 5002
COPY . .
RUN pip3 install paho-mqtt
RUN pip3 install Flask
CMD python3 main.py
