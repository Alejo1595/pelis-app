pipeline {
    //Donde se va a ejecutar el Pipeline
    agent {
        label 'Slave_Induccion'
    }

    //Opciones específicas de Pipeline dentro del Pipeline
    options {
        buildDiscarder(logRotator(numToKeepStr: '3'))
        disableConcurrentBuilds()
    }

    //Una sección que define las herramientas “preinstaladas” en Jenkins
    tools {
        jdk 'JDK8_Centos' //Verisión preinstalada en la Configuración del Master
    }

    //Aquí comienzan los “items” del Pipeline
    stages {
        stage('Checkout') {
            steps {
                echo '------------>Checkout<------------'
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    doGenerateSubmoduleConfigurations: false,
                    extensions: [],
                    gitTool: 'Default',
                    submoduleCfg: [],
                    userRemoteConfigs: [[
                        credentialsId: 'Github_Pelis_Alejo1595',
                        url:'https://github.com/Alejo1595/peliculas-app.git'
                    ]]
                ])
            }
        }

        stage('Install') {
            steps {
                echo '------------>Install<------------'
                sh 'npm cache clean --force'
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo '------------>Test<------------'
                sh 'ng test --watch=false --browsers ChromeHeadlessCI --code-coverage'
            }
        }

        stage('Static Code Analysis') {
            steps {
                echo '------------>Análisis de código estático<------------'
                withSonarQubeEnv('Sonar') {
                    sh "${tool name: 'SonarScanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'}/bin/sonar-scanner -Dsonar.projectKey=co.co.com.ceiba.adn-pelis-app-julian.sanchez -Dsonar.projectName=CeibaADN-pelis-app-julian.sanchez -Dproject.settings=./sonar-project.properties"
                }
            }
        }

        stage('Build') {
            steps {
                echo '------------>Build<------------'
                sh 'npm run build --configuration=production --outputHashing'
            }
        }
    }

    post {
        always {
            echo 'This will always run'
        }
        success {
            echo 'This will run only if successful'
        }
        failure {
            echo 'This will run only if failed'
        }
        unstable {
            echo 'This will run only if the run was marked as unstable'
        }
        changed {
            echo 'This will run only if the state of the Pipeline has changed'
            echo 'For example, if the Pipeline was previously failing but is now successful'
        }
    }
}
