pipeline {
  agent any
  environment {
    IMAGE = 'veeruuuu/webapplication:latest'
    TAG = "latest"
  }
 stage('Clone') {
    steps {
        git branch: 'main', credentialsId: 'veereshveeruu', url: 'https://github.com/veereshveeruu/webapplication.git'
    }
}

    stage('Build Docker') {
      steps {
        sh 'docker build -t $IMAGE:$TAG .'
      }
    }
    stage('Push Docker') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
          sh 'echo $PASS | docker login -u $USER --password-stdin'
          sh 'docker push $IMAGE:$TAG'
        }
      }
    }
    stage('Deploy to K8s') {
      steps {
        sh 'kubectl apply -f k8s/deployment.yaml'
        sh 'kubectl apply -f k8s/service.yaml'
      }
    }
  }
  post {
    success {
      slackSend(channel: '#ci-cd', message: "✅ Deployed successfully!")
    }
    failure {
      slackSend(channel: '#ci-cd', message: "❌ Deployment failed.")
    }
  }
}

