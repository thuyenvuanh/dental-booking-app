#!groovy

pipeline {
    agent {
        label 'Host'
    }
    parameters {
        string(
                name: 'BUILD_NUM',
                defaultValue: '',
                description: 'Deploy target'
        )
        booleanParam(
                name: 'Deploy',
                defaultValue: false,
                description: 'Deploy dental-booking-app to docker'
        )
        booleanParam(
                name: 'DEL_OLD_IMG',
                defaultValue: true,
                description: 'Only keep newest build'
        )
    }
    stages {
        stage('Validate inputs') {
            steps {
                sh '''
                    if [ {params.Deploy} -ne true -a {params.BUILD_NUM} ]; then
                        echo "BUILD_NUMB is required when deploy"
                    fi
                '''
            }
        }
        stage('Build dental-booking-app') {
            when{
                expression {
                    return !params.Deploy
                }
            }
            steps {
                sh "docker build -t dental-booking-app:${env.BUILD_NUMBER} ."
            }
        }
        stage('Deploy') {
            when{
                expression {
                    return params.Deploy
                }
            }
            steps {
                script {
                    sh  """
                            if [[ -z "${params.BUILD_NUM}" ]]; then
                                echo "BUILD_NUM is required";
                                exit -1;
                            fi
                            docker stop dba || true
                            docker rm dba || true
                            docker run --publish 5000:5000 --detach --restart=always --name dba dental-booking-app:${params.BUILD_NUM}
                        """
                }
            }
        }
        stage('Delete old build') {
            when {
                expression {
                    return params.DEL_OLD_IMG && params.Deploy
                }
            }
            steps {
                build job: 'remove-docker-image', parameters: [string(name: 'IMAGE_NAME', value: 'dental-booking-app'), string(name: 'BUILD_NUM', value: "${params.BUILD_NUM}")]
                script {
                    currentBuild.description = "image_id -> dental-booking-app:" + sh(
                            script: "docker image ls | grep dental-booking-app | grep ${env.BUILD_NUMBER} | awk \'{print \$2}\'",
                            returnStdout: true
                    ).trim()
                }
            }
        }
    }
}