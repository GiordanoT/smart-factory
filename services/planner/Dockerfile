FROM python:3.11
WORKDIR /app
EXPOSE 5001
COPY . .
RUN pip3 install Flask
RUN pip3 install requests
CMD python3 main.py
