pipeline {
    agent any

    environment {
        JAVA_HOME = '/usr/lib/jvm/java-11-openjdk-amd64'
        S3_BUCKET = 'www.goexpert.info'  // 添加S3桶名称环境变量
    }

    stages {
        stage('Build') {
            steps {
                echo 'Starting build stage...'
                script {
                    sh 'mvn clean package'
                }
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                script {
                    sh 'mvn test'
                }
            }
            post {
                always {
                    junit 'target/surefire-reports/*.xml'
                }
                success {
                    echo 'Tests passed successfully.'
                }
                failure {
                    echo 'Tests failed.'
                }
            }
        }

        // 新增阶段: 上传到S3
        stage('Upload to S3') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'adeeplearnaws-cli', usernameVariable: 'AAKIA5BZ7T3UJFQRIN2HT', passwordVariable: '+5aHMQcb0VcbgZ8ACIj+70htx2DMVGEqNUyFGlD1')]) {
                    script {
                        // 安装AWS CLI（如果尚未安装）
                        // sh 'curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"'
                        // sh 'unzip awscliv2.zip'
                        // sh './aws/install'

                        // 上传文件到S3
                        sh "aws s3 sync https://github.com/yeye-git/GoExpertsFrontend.git/GoexpertFronted/build s3://${www.goexpert.info}/ --no-sign-request"
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application...'
                script {
                    sh './deploy.sh'
                }
            }
            post {
                success {
                    echo 'Deployment successful.'
                }
                failure {
                    echo 'Deployment failed.'
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            cleanWs()
        }
    }
}
