# [Seu Nome Escolhido para o Projeto Aqui, ex: CareerPath ou SkillUp]

## Objetivo da Solução (Global Solution)

Este aplicativo mobile foi desenvolvido para atender ao desafio da Global Solution, focado na **Adaptação de Carreiras**. A solução tem como objetivo principal auxiliar o usuário a mapear e planejar seu desenvolvimento profissional, fornecendo sugestões de cursos e permitindo o gerenciamento de um plano de estudos personalizado.

## Integrantes do Grupo

| Nome Completo | RM |
| :--- | :--- |
| Jonas Kimio Isiki | 560560 |
| Daniel Kendi Saijo Araki | 553043 |
| Marcos Vinicius Alves Marques | 560475 |
---

## Tecnologias e Arquitetura (Arquitetura 20pts)

O projeto segue a arquitetura moderna de aplicações React Native, utilizando:

* **Framework:** React Native (Expo Router)
* **Linguagem:** TypeScript
* **Gerenciamento de Estado/Dados:** Utilização de `useState` e integração com API RESTful via **Axios** (Conforme requisito da disciplina).
* **Estilização:** Criação de uma identidade visual customizada (`src/constants/colors.ts`) e uso de um componente de botão reutilizável (`src/components/Button.tsx`).

## Funcionalidades Implementadas (CRUD 40pts)

O aplicativo implementa o **CRUD** (Create, Read, Update, Delete) com tratamento de erro e feedback visual.

| Ação | Rota/Tela | Detalhe |
| :--- | :--- | :--- |
| **CREATE** | Detalhes do Curso (`/details/[id]`) | Salvar um curso no plano de estudos do usuário. |
| **READ** | Home (`/home`) | Listar as sugestões de cursos vindo da API. |
| **READ** | Meus Cursos (`/courses`) | Listar os cursos que foram salvos pelo usuário. |
| **UPDATE** | Perfil (`/profile`) | Atualizar a profissão ou foco do usuário. |
| **DELETE** | Meus Cursos (`/courses`) | Remover um curso do plano de estudos. |

---

## Como Rodar o Projeto Localmente

Para avaliar a solução siga estes passos:

### 1. Pré-requisitos
* Node.js e npm/Yarn instalados.
* Expo CLI instalado (`npm install -g expo-cli`).

### 2. Clonagem e Instalação

```bash
# Clone o repositório do GitHub Classroom
git clone <URL do seu repositório>
cd <nome-da-pasta-do-projeto>

# Instale as dependências
npm install