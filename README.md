# TALLERES DEVSECOPS

## CONTENEDORES

### SONARQUBE

```bash
docker run -d --name=sonarqube -d -p 9000:9000 sonarqube:lts-community
```

### TRIVY

```bash
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock -v /tmp/trivycache:/root/.cache/ aquasec/trivy image alpine:3.19.1
```
