pipeline {
  agent any
  stages {
    stage('Clone Repository') {
      steps {
        checkout([$class: 'GitSCM', 
          branches: [[name: '*/SSO-signin']], 
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
      }
    }
    // stage('Test') {
    //   steps {
    //     bat 'npm test'
    //   }
    // }
    stage('Deploy') {
      steps {
        bat '''
        if not exist C:\\Path\\To\\Deployment\\Folder mkdir C:\\Path\\To\\Deployment\\Folder
        xcopy /E /I /Y build C:\\Path\\To\\Deployment\\Folder
        '''
      }
    }
  }
}
