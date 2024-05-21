pipeline {
    agent any
    tools{
        maven 'Maven'
    }

    stage("init"){
        steps{
            echo "building the application..."
            sh 'mvn package'
        }

    }







    stage("build jar"){
        steps{
            echo "building the application..."
            sh 'mvn package'
        }

    }


    stage("build image"){
        steps{
            echo "building the docker image..."
            withCredentials([usernamePassword(credentialsId: 'docker-hub-repo', passwordVariable:'PASS', usernameVariable:'USER')])
            {
                sh 'docker build -t '
                
            }
        }

    }


















}