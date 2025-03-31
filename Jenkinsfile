pipeline {
  agent any
  stages {
    stage('Clone Repository') {
      steps {
        checkout([$class: 'GitSCM', 
          branches: [[name: '*/main']], 
          userRemoteConfigs: [[url: 'https://github.com/dmark1029/nextUI-FE.git']]
        ])
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
        bat 'echo "Build folder content:"'
        bat 'dir .next'
      }
    }
    // stage('Test') {
    //   steps {
    //     bat 'npm test'
    //   }
    // }
    // 123
    stage('Deploy') {
      steps {
        bat '''
        if not exist C:\\Path\\To\\Deployment\\Folder mkdir C:\\Path\\To\\Deployment\\Folder
        xcopy /E /I /Y .next C:\\Path\\To\\Deployment\\Folder
        '''
      }
    }
  }
}
