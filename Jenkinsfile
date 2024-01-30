pipeline {
    agent any
    tools{
        gradle 'gradle'
    }

    stages {
        stage('BE-Build'){
            steps{
                dir("./Back"){
                    sh "chmod +x gradlew"
                    sh "gradle wrapper"
                    sh "./gradlew clean build"
                }
            }
        }
        stage('FE-Build'){
            steps{
                nodejs(nodeJSInstallationName: 'nodejs') {
                    dir("./Front"){
                        sh "npm install"
                    }
                }
            }
        }
        stage('Build and Push Docker Image...') {
            steps {
                script {
                  // CUSTOM REGISTRY
                    docker.withRegistry('https://myregistry.images.io:30000') {

                        /* Build the container image */
                        def dockerImage = docker.build("my-image:${env.BUILD_ID}")

                        /* Push the container to the custom Registry */
                        dockerImage.push()
			
                    }
                    
		            sh "docker rmi -f main:${env.BUILD_ID}"
               }
            }
        }
    }
}
