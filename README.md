https://docs.sonarsource.com/sonarqube/latest/setup-and-upgrade/install-the-server/installing-sonarqube-from-docker/

    


docker run --rm \
    -d \
    -p 9000:9000 \
    -v sonarqube_extensions:/opt/sonarqube/extensions \
    sonarqube:lts-community