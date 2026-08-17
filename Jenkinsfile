pipeline {
    agent any

    tools {
        nodejs 'node'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'pnpm install --frozen-lockfile'
            }
        }

        stage('Format') {
            steps {
                sh 'pnpm format'
            }
        }

        stage('Linter') {
            steps {
                sh 'pnpm lint'
            }
        }

        stage('Unit Tests') {
            steps {
                sh 'pnpm test'
            }
        }


    }

    post {
        always {
            cleanWs()
        }
    }
}