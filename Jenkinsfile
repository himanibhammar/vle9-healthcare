
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
            echo 'Pipeline completed successfully. Trivy scan finished.'
        }

        failure {
            echo 'Pipeline failed. Check Console Output for the error.'
        }

        always {
            echo 'VLE-9 Healthcare DevSecOps pipeline execution finished.'
        }
    }
}
