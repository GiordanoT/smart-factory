The Smart Factory project showcases the potential of IoT and self-adaptive systems in revolutionizing industrial environments. This project aims to create a highly advanced system that monitors and optimizes various aspects of factory operations. At its core, the project embraces the concept of the Internet of Things (IoT), which facilitates the seamless connection and communication between physical sensors. By establishing a network of interconnected components, the system enables the efficient exchange of data, enabling real-time monitoring, analysis, and adaptive decision making. By integrating the principles of self-adaptive systems, the project empowers the system to dynamically adjust its behavior based on environmental feedback. This adaptability enables the system to autonomously respond to changing conditions, optimize performance, and improve overall efficiency. The project encompasses a wide range of IoT sensors and actuators strategically deployed throughout the factory environment. By combining IoT technologies and self adaptive systems, the project demonstrates the potential of intelligent and interconnected systems in industrial settings.

![alt text](https://github.com/GiordanoT/smart-factory/blob/main/architecture.png)

Instructions:
  - Clone the repository: https://github.com/GiordanoT/smart-factory.git
  - Run: docker compose up -d
  - Go to: http://localhost:3001

Customizations (edit .env file):
  - REACT_APP_ROOMS ===> System's rooms
  - MAX_MOVEMENT ===> Value related to the activation of Alarm when Locker is ON
  - MAX_TEMPERATURE ===> Value related to the activation of Cool Conditioner
  - MIN_TEMPERATURE ===> Value related to the activation of Hot Conditioner
  - MAX_AIR ===> Value related to the activation of Fan

*Optimal values ​​will be calculated automatically based on these values.

