pipeline {
    agent any
 environment {
        // 适用于Node.js项目的环境变量设置
        S3_BUCKET = 'www.goexpert.info'  // S3桶名称
    }


 

    stages {

            stage('git checkout') {
            steps {
                script {
                    git(
                        branch: 'main',
                        url: 'git@github.com:yeye-git/GoExpertsFrontend.git',
                        credentialsId: 'github-ssh'
                   )
                }
            }   
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing project dependencies...'
                script {
                    sh '/usr/bin/npm install'
                }
            }
        }

        stage('Build') {
            steps {
                echo 'Starting build stage...'
                script {
                    sh ' /usr/bin/npm run build'
                }
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                script {
                    sh '/usr/bin/npm run test'
                }
            }
            post {
                always {
                    // 适应Node.js项目的测试报告处理方式，如果使用Jest等工具
                    junit 'build/test-results/**/*.xml'
                }
                success {
                    echo 'Tests passed successfully.'
                }
                failure {
                    echo 'Tests failed.'
                }
            }
        }

        // 更新阶段: 上传到S3
        stage('Upload to S3') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'adeeplearnaws-cli', usernameVariable: 'AKIA5BZ7T3UJFQRIN2HT', passwordVariable: '+5aHMQcb0VcbgZ8ACIj+70htx2DMVGEqNUyFGlD1')]) {
                    script {
                        // 确保AWS CLI安装和配置好
                        sh "aws s3 sync ./build s3://www.goexpert.info"
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
            // cleanWs()
        }
    }
}
