
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
                bat 'docker run --rm aquasec/trivy:latest image --severity HIGH,CRITICAL healthcare-app:%BUILD_NUMBER%'
            }
        }
    }
}
