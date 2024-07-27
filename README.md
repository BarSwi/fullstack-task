# Backend

## Polska wersja

### Backend lokalnie (Docker):

Uruchomić plik 'docker-compose.yml' komendą: docker-compose up --build -d
Nie trzeba się wtedy niczym martwić ani zmieniać żadnych linijek w plikach '*.properties'
Backend uruchomi się w środku dockera i jest mapowany bez problemu na localhost przez port 8081.

### Backend lokalnie (Bez dockera):
Lokalnie backend postawiony bez dockera działa na porcie 8080.
W pliku 'application.properties' należy zmienić dane do bazy danych to jest:
- spring.datasource.username
- spring.datasource.password
- spring.datasource.driver-class-name

Oraz w pliku 'application-dev.properties' (Ponieważ lokalnie backend działa na profilu dev):
- spring.datasource.

Wartości należy przypisać do odpowiadająych działającej bazie danych. Biorąc pod uwagę używanie Hibernate w projekcie, może to być dowolna wspierana przez owy framework baza danych.

Wcześniej oczywiście należy zainstalować, przy użyciu Maven'a odpowiednie zależności z pliku pom.xml.
W folderze z projektem należy uruchomić komendy:

- mvn clean (dla bezpieczeństwa)
- mvn install
- Dla bezpieczeństwa również warto przeładować strukturę plików w projekcie.

Na koniec uruchomić główną klasę z backendu i wszystko będzie działać na http://localhost:8080/EndPoints

Według mnie, niewątpliwie lepszym wyborem jest docker wspomniany wyżej.


## English version

To start the backend using Docker, run the following command with your docker-compose.yml file: docker-compose up --build -d
There is no need to worry about changing any lines in the .properties files. 
The backend will start inside Docker and will be mapped to localhost on port 8081 without any issues.

### Backend locally (Without docker):

When running the backend locally without Docker, it operates on port 8080. 
You need to modify the database configuration in the application.properties file, specifically:
- spring.datasource.username
- spring.datasource.password
- spring.datasource.driver-class-nam

Also, in the application-dev.properties file (since the backend runs on the dev profile locally):
- spring.datasource.

You need to assign values corresponding to your running database. Considering the use of Hibernate in the project, this can be any database supported by the framework.

Before proceeding, make sure to install the necessary dependencies from the pom.xml file using Maven. In the project folder, run the following commands:

- mvn clean (safety reasons)
- mvn install
- For safety, it is also advisable to reload the file structure in the project.

Finally, start the main class of the backend, and everything will work at http://localhost:8080/EndPoints.

In my opinion, using Docker as mentioned above is undoubtedly the better choice.