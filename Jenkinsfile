
pipeline {
    agent any

    environment {
        SONAR_SCANNER_HOME = tool name: 'SonarScanner',
            type: 'hudson.plugins.sonar.SonarRunnerInstallation'
    }

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
                    bat '"%SONAR_SCANNER_HOME%\\bin\\sonar-scanner.bat" -Dsonar.projectKey=vle9-healthcare'
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
                
        stage('OWASP ZAP DAST Scan') {
            steps {
                bat '''
                    if not exist zap-reports mkdir zap-reports
                    docker run --rm -t -v "%CD%/zap-reports:/zap/wrk:rw" ghcr.io/zaproxy/zaproxy:stable zap-baseline.py -t http://host.docker.internal:8081 -r zap-report.html
                '''
            }
            post {
                always {
                    archiveArtifacts artifacts: 'zap-reports/zap-report.html',
                        allowEmptyArchive: true
                }
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