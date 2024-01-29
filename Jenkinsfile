pipeline {
    agent any
    tools{
        gradle 'gradle'
    }

    stages {
        stage('BE-Build'){
            steps{
                dir("./Back){
                    sh "./gradlew clean build"
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
