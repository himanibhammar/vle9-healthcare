
pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/himanibhammar/vle9-healthcare.git'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    bat 'sonar-scanner -D"sonar.projectKey=vle9-healthcare"'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t healthcare-app:%BUILD_NUMBER% .'
            }
        }

        stage('Save Docker Image') {
            steps {
                bat 'docker save -o healthcare-app-%BUILD_NUMBER%.tar healthcare-app:%BUILD_NUMBER%'
            }
        }

        stage('Trivy Security Scan') {
            steps {
                bat 'docker run --rm -v "%CD%:/work" aquasec/trivy:latest image --input /work/healthcare-app-%BUILD_NUMBER%.tar --severity HIGH,CRITICAL'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully.'
        }
        failure {
            echo 'Pipeline failed. Check Console Output.'
        }
        always {
            echo 'VLE-9 Healthcare DevSecOps pipeline execution finished.'
        }
    }
}
