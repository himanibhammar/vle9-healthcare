
pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/himanibhammar/vle9-healthcare.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t healthcare-app:%BUILD_NUMBER% .'
            }
        }

        
        stage('Trivy Security Scan') {
            steps {
                bat 'docker run --rm -v //./pipe/docker_engine://./pipe/docker_engine aquasec/trivy:latest image --docker-host npipe:////./pipe/docker_engine --severity HIGH,CRITICAL healthcare-app:%BUILD_NUMBER%'
            }
        }

    }
}
