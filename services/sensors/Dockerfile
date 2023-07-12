FROM python:3.11
WORKDIR /app
COPY . .
RUN pip3 install paho-mqtt
RUN pip3 install pytz
RUN pip3 install python-dotenv
CMD python3 main.py
