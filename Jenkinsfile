pipeline {
  agent any
  stages {
    stage('Clone Repository') {
      steps {
        git 'https://github.com/your-repo.git'
      }
    }
    stage('Install Dependencies') {
      steps {
        bat 'npm install'
      }
    }
    stage('Build') {
      steps {
        bat 'npm run build'
      }
    }
    stage('Test') {
      steps {
        bat 'npm test'
      }
    }
    stage('Deploy') {
      steps {
        bat 'xcopy /E /I /Y build C:\\Path\\To\\Deployment\\Folder'
      }
    }
  }
}
