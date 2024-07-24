# Instalowanie backendu w środku dockera, jest to niezalecane podejście, ale w celach zadania pozwoliłem sobię na to obustronne udogodnienie logistyczne.
FROM maven:3.9.8 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean install -DskipTests

FROM openjdk:21-jdk
ARG JAR_FILE=target/*.jar
COPY --from=build /app/target/*.jar app.jar
ENTRYPOINT ["java", "-Dspring.profiles.active=docker", "-jar", "/app.jar"]