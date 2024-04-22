# CREACIÓN DE RECURSOS EN AZURE 

## INSTALACIÓN DE AZURE-CLI

```bash
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
```

## CREACIÓN DE RECURSOS

**NOTA**: *Modificar los archivos de params siguiendo las indicaciones del ponente*

### CREACIÓN DEL GRUPO DE RECURSOS

```bash
az group create --name talleres --location "France Central"
``` 

### CREACIÓN DEL PLAN DE SERVICIOS DE APLICACIONES

```bash
az deployment group create --resource-group talleres --template-file app-service-plan/template.json --parameters app-service-plan/parameters.json 
```
### CREACIÓN DEL WEBAPP
```bash
az deployment group create --resource-group talleres --template-file app/template.json --parameters app/parameters.json 

```