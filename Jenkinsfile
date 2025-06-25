pipeline {
  agent any

  environment {
    IMAGE = 'veeruuuu/webapplication'
    TAG = 'latest'
    KUBECONFIG = '/var/lib/jenkins/.kube/config'
  }

  stages {
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
        script {
          echo "🚀 Deploying to Kubernetes"
          withEnv([
            'KUBECONFIG=/var/lib/jenkins/.kube/config',
            'MINIKUBE_HOME=/var/lib/jenkins'
          ]) {
            sh 'kubectl apply -f k8s/deployment.yaml'
          }
        }
      }
    }
  }

  post {
    success {
      slackSend(
        channel: '#all-infy-2',
        message: "✅ Deployed successfully!",
        tokenCredentialId: 'slack-bot-token'
      )
    }
    failure {
      slackSend(
        channel: '#all-infy-2',
        message: "❌ Deployment failed.",
        tokenCredentialId: 'slack-bot-token'
      )
    }
  }
}

