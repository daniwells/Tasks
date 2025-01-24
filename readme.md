# Tasks

Tasks se trata de um projeto fullstack de um aplicativo para o gerenciamento de tarefas que permite que você organize o seu dia de forma rápida e eficaz.

O desenvolvimento deste app faz parte do curso [React Native: Desenvolva APPs Nativas para Android e iOS](https://www.udemy.com/share/101Waw3@KxObQzWQ_BrZPnTjaMXgHYX-nLOszn8t_lhPGy1RH6NdvK6LF3mGG4MKwDo2uZEcHQ==/) o qual eu comprei e me dediquei a fazer.

## :memo: Requisitos

* Linguagem de programação [```Javascript```](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* Framework frontend [```React Native```](https://reactnative.dev/docs/getting-started)
* Framework backend [```Express```](https://expressjs.com/)
* Framework [```Expo```](https://expo.dev/)

## :hammer: Tutorial de execução
Siga o tutorial abaixo para executar o projeto localmente.

#### 🔴 1. Clonar Repositório
Certifique-se de possuir o *git* instalado, então faça o clone do projeto: 

    git clone https://github.com/daniwells/Projeto-Invoice.git

Ao executar o frontend e o backend da aplicação, recomenda-se abrir dois terminais.

### **Frontend**
#### 🔴 2. Instalar dependências frontend
Acesse o frontend do projeto e Realize a instalação das dependências:

      cd frontend
      npm install

#### 🔴 3. Executar frontend localhot
Após isso você pode executar o frontend com o seguinte comando:

    npx expo start

- **Com Iphone**
  
O lado do cliente pode ser aberto tanto na web, quanto no celular usando o aplicativo da expo, com ele basta que você escaneie o QR Code que aparece no terminal.
    
- **Android Stúdio**
  
Com Android Stúdio instalado e o projeto em execução, você deve primeiro abrir um novo dispositivo virtual e após isso você pode pressionar a tecla A no terminal onde o projeto está sendo executado, então o programa irá instalar todas as dependências necessárias no emulador e o aplicativo já estará disponível para uso.

### **Backend**
#### 🔴 4. Executar backend
Para o backend executar o backend, com o reposiório já clonado, você pode executar os seguintes comandos:

      cd backend
      npm run start
      npm run dev

#### 🔴 5. Configurar IP do servidor
Por fim, não esqueça de configurar o IP do seu servidor no frontend, pois diferente de aplicações localhost, o Expo funcionará em LAN. Você pode configurar o IP pelo arquivo [```common.js```](frontend/src/common.js) no frontend.

![image](https://github.com/user-attachments/assets/0da2d592-839c-426f-9c57-7f1405b7a799)

A partir desta etapa você já poderá se aproveitar o applicativo!

## ✒️ Licença 

O projeto Tasks está sobre a licença [```MIT LICENSE```](LICENSE).

## :octocat: Desenvolvedor

* **Daniel**

